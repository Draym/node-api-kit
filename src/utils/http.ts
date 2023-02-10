import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios'
import {isEmpty, isNotEmpty, isNotNull, isNull} from "./checks"
import * as http from "http"
import * as https from "https"
import {URLSearchParams} from "url"
import Auth from "../api/auth"
import {logger} from "./logger"
import {httpsOverHttp} from "tunnel"

export interface ErrorResponse {
    message: string
    code: string
}

export enum ApiError {
    UNAUTHORIZED = "unauthorized",
    SERVER_ERROR = "server_error",
    OTHER = "other"
}

export interface ErrorDTO {
    type: ApiError
    message: string
    code: string | undefined
}

export class ServerProxy {
    static proxy: {
        host: string,
        port: number
    } | null = null
}

export interface GetParam {
    path?: { [key: string]: string | null | undefined } | null
    query?: { [key: string]: string | null | undefined } | null
}

export class PostParam {
    path?: { [key: string]: string | null | undefined } | null
    query?: { [key: string]: string | null | undefined } | null
    body?: { [key: string]: any } | null
}

export default class Http {

    private static stringifyParameters(parameters: { [key: string]: string | string[] | null | undefined } | null): string {
        if (isNull(parameters)) {
            return ''
        }
        let result = ''
        for (let i in parameters) {
            const param = parameters[i]
            if (isNotNull(param)) {
                if (Array.isArray(param)) {
                    param.forEach((it: string) => {
                        if (result !== '')
                            result += '&'
                        result += `${i}=${encodeURIComponent(it)}`
                    })
                } else {
                    if (result !== '')
                        result += '&'
                    result += `${i}=${encodeURIComponent(param)}`
                }
            }
        }
        result = isEmpty(result) ? result : '?' + result
        return result
    }

    private static fillEndpoint(endpoint, path: { [key: string]: string | null | undefined } | null): string {
        if (isNull(path)) {
            return endpoint
        }
        for (let i in path) {
            const param = path[i]
            if (isNotNull(param)) {
                endpoint = endpoint.replace(`{${i}}`, param)
            }
        }
        return endpoint
    }

    private static createUrl(domain: string | null, endpoint: string, urlParameters: string | null): string {
        if (isNotNull(domain) && domain.slice(-1) !== '/' && endpoint.slice(0, 1) !== '/') {
            domain += '/'
        }
        return (domain || '') + endpoint + (urlParameters || '')
    }

    private static handleHttpResult<T>(
        response: AxiosResponse,
        onSuccess: (data: T) => void,
        onError: (error: ErrorDTO) => void) {
        logger.success('[HTTP]', response.data)

        const status = response.status
        if (status === 200) {
            onSuccess(response.data)
        } else {
            const error: ErrorResponse = response.data
            onError({
                message: error.message,
                code: error.code,
                type: ApiError.SERVER_ERROR
            })
        }
    }

    private static handleHttpError(error, onError: (error: ErrorDTO) => void) {
        logger.error('[API][ERROR]-->', error)
        if (isNotNull(error?.response?.data)) {
            const data = error.response.data
            onError({
                message: isNotEmpty(data.message) ? data.message : JSON.stringify(data),
                code: data.code,
                type: ApiError.SERVER_ERROR
            })
        } else {
            onError({
                message: JSON.stringify(error.error),
                code: undefined,
                type: ApiError.OTHER
            })
        }
    }

    private static buildUrlSearchParam(data: { [key: string]: any } | null): URLSearchParams {
        const params = new URLSearchParams();
        if (isNull(data)) {
            return params
        }
        for (const key in data) {
            params.append(key, data[key]);
        }
        return params
    }

    private static httpURL<T>(
        method: Method,
        domain: string | null,
        endpoint: string,
        headers: { [key: string]: string },
        params: GetParam,
        onSuccess: (data: T) => void,
        onError: (error: ErrorDTO) => void) {

        const urlParameters: string = this.stringifyParameters(params.query)
        const finalEndpoint: string = this.fillEndpoint(endpoint, params.path)
        const url: string = this.createUrl(domain, finalEndpoint, urlParameters)
        logger.debug(`[API_${method}]: ${url}`)

        const request: AxiosRequestConfig = {
            url: url,
            method: method,
            headers: headers,
            withCredentials: true
        }
        if (isNotNull(ServerProxy.proxy)) {
            request.httpsAgent = httpsOverHttp({
                proxy: ServerProxy.proxy,
            })
        }

        axios(request).then(response => {
            this.handleHttpResult(response, onSuccess, onError)
        }).catch(error => {
            this.handleHttpError(error, onError)
        })
    }

    private static httpData<T>(
        method: Method,
        domain: string | null,
        endpoint: string,
        headers: { [key: string]: string },
        params: PostParam,
        onSuccess: (data: T) => void,
        onError: (error: ErrorDTO) => void) {

        const urlParameters: string = this.stringifyParameters(params.query)
        const finalEndpoint = this.fillEndpoint(endpoint, params.path)
        const url: string = this.createUrl(domain, finalEndpoint, urlParameters)

        logger.debug(`[API_${method}]: ${url}`)

        const isJson = headers['Content-Type'].includes('application/json')

        const request: AxiosRequestConfig = {
            url: url,
            method: method,
            headers: headers,
            data: isJson ? params.body : this.buildUrlSearchParam(params.body),
            httpAgent: new http.Agent({ keepAlive: true }),
            httpsAgent: new https.Agent({ keepAlive: true }),
            withCredentials: true
        }
        if (isNotNull(ServerProxy.proxy)) {
            request.httpsAgent = httpsOverHttp({
                proxy: ServerProxy.proxy,
            })
        }

        axios(request).then(response => {
            this.handleHttpResult(response, onSuccess, onError)
        }).catch(error => {
            this.handleHttpError(error, onError)
        })
    }

    static get<T>(domain: string | null, endpoint: string, auth: Auth | null, params: GetParam, onSuccess: (data: T) => void, onError: (error: ErrorDTO) => void) {
        const headers: { [key: string]: string } = {}
        headers['Access-Control-Allow-Origin'] = '*'
        auth?.populateHeader(headers)
        this.httpURL('GET', domain, endpoint, headers, params, onSuccess, onError)
    }

    static post<T>(domain: string | null, endpoint: string, auth: Auth | null, params: PostParam, onSuccess: (data: T) => void, onError: (error: ErrorDTO) => void, type: string = 'application/json') {
        const headers: { [key: string]: string } = {}
        headers['Content-Type'] = type
        headers['Accept'] = 'application/json'
        auth?.populateHeader(headers)
        this.httpData('POST', domain, endpoint, headers, params, onSuccess, onError)
    }

    static put<T>(domain: string | null, endpoint: string, auth: Auth | null, params: PostParam, onSuccess: (data: T) => void, onError: (error: ErrorDTO) => void, type: string = 'application/json') {
        const headers: { [key: string]: string } = {}
        headers['Content-Type'] = type
        headers['Accept'] = 'application/json'
        auth?.populateHeader(headers)
        this.httpData('PUT', domain, endpoint, headers, params, onSuccess, onError)
    }

    static delete<T>(domain: string | null, endpoint: string, auth: Auth | null, params: PostParam, onSuccess: (data: T) => void, onError: (error: ErrorDTO) => void, type: string = 'application/json') {
        const headers: { [key: string]: string } = {}
        headers['Content-Type'] = type
        headers['Accept'] = 'application/json'
        auth?.populateHeader(headers)

        this.httpData('DELETE', domain, endpoint, headers, params, onSuccess, onError)
    }
}