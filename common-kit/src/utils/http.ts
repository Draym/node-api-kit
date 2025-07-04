import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios'
import {isEmpty, isNotEmpty, isNotNull, isNull} from "./checks"
import Auth from "../api/auth"

interface ErrorResponse {
    message: string
    code: string
}

export enum HttpApiError {
    UNAUTHORIZED = "unauthorized",
    SERVER_ERROR = "server_error",
    OTHER = "other"
}

export interface HttpError {
    type: HttpApiError
    message: string
    code: string | undefined
}

export class ServerProxy {
    static proxy: {
        host: string,
        port: number
    } | null = null
}

export interface HttpGetParam {
    path?: { [key: string]: string | null | undefined } | null
    query?: { [key: string]: string | null | undefined } | null
}

export class HttpPostParam {
    path?: { [key: string]: string | null | undefined } | null
    query?: { [key: string]: string | null | undefined } | null
    body?: { [key: string]: any } | null
}

export class Http {

    static stringifyParameters(parameters: {
        [key: string]: boolean | boolean[] | number | number[] | string | string[] | null | undefined
    } | null): string {
        if (isNull(parameters)) {
            return ''
        }
        let result = ''
        for (let i in parameters) {
            const param = parameters[i]
            if (isNotNull(param)) {
                if (Array.isArray(param)) {
                    param.forEach((it: string | number | boolean) => {
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

    static fillEndpoint(endpoint, path: { [key: string]: string | null | undefined } | null): string {
        if (isNull(path)) {
            return endpoint
        }
        for (let i in path) {
            const param = path[i]
            if (isNotNull(param)) {
                endpoint = endpoint.replace(`:${i}`, param)
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
        onError: (error: HttpError) => void) {

        const status = response.status
        if (status === 200) {
            onSuccess(response.data)
        } else {
            const error: ErrorResponse = response.data
            onError({
                message: error.message,
                code: error.code,
                type: HttpApiError.SERVER_ERROR
            })
        }
    }

    private static handleHttpError(error, onError: (error: HttpError) => void) {
        if (isNotNull(error?.response?.data)) {
            const data = error.response.data
            onError({
                message: isNotEmpty(data.message) ? data.message : JSON.stringify(data),
                code: data.code,
                type: HttpApiError.SERVER_ERROR
            })
        } else {
            onError({
                message: JSON.stringify(error.error),
                code: undefined,
                type: HttpApiError.OTHER
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
        params: HttpGetParam,
        onSuccess: (data: T) => void,
        onError: (error: HttpError) => void) {

        const urlParameters: string = this.stringifyParameters(params.query)
        const finalEndpoint: string = this.fillEndpoint(endpoint, params.path)
        const url: string = this.createUrl(domain, finalEndpoint, urlParameters)

        const request: AxiosRequestConfig = {
            url: url,
            method: method,
            headers: headers,
            withCredentials: true,
            proxy: ServerProxy.proxy
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
        params: HttpPostParam,
        onSuccess: (data: T) => void,
        onError: (error: HttpError) => void) {

        const urlParameters: string = this.stringifyParameters(params.query)
        const finalEndpoint = this.fillEndpoint(endpoint, params.path)
        const url: string = this.createUrl(domain, finalEndpoint, urlParameters)

        const isJson = headers['Content-Type'].includes('application/json')

        const request: AxiosRequestConfig = {
            url: url,
            method: method,
            headers: headers,
            data: isJson ? params.body : this.buildUrlSearchParam(params.body),
            withCredentials: true,
            proxy: ServerProxy.proxy
        }

        axios(request).then(response => {
            this.handleHttpResult(response, onSuccess, onError)
        }).catch(error => {
            this.handleHttpError(error, onError)
        })
    }

    static get<T>(domain: string | null, endpoint: string, auth: Auth | null, params: HttpGetParam, onSuccess: (data: T) => void, onError: (error: HttpError) => void) {
        const headers: { [key: string]: string } = {}
        headers['Access-Control-Allow-Origin'] = '*'
        auth?.populateHeader(headers)
        this.httpURL('GET', domain, endpoint, headers, params, onSuccess, onError)
    }

    static post<T>(domain: string | null, endpoint: string, auth: Auth | null, params: HttpPostParam, onSuccess: (data: T) => void, onError: (error: HttpError) => void, type: string = 'application/json') {
        const headers: { [key: string]: string } = {}
        headers['Content-Type'] = type
        headers['Accept'] = 'application/json'
        auth?.populateHeader(headers)
        this.httpData('POST', domain, endpoint, headers, params, onSuccess, onError)
    }

    static put<T>(domain: string | null, endpoint: string, auth: Auth | null, params: HttpPostParam, onSuccess: (data: T) => void, onError: (error: HttpError) => void, type: string = 'application/json') {
        const headers: { [key: string]: string } = {}
        headers['Content-Type'] = type
        headers['Accept'] = 'application/json'
        auth?.populateHeader(headers)
        this.httpData('PUT', domain, endpoint, headers, params, onSuccess, onError)
    }

    static delete<T>(domain: string | null, endpoint: string, auth: Auth | null, params: HttpPostParam, onSuccess: (data: T) => void, onError: (error: HttpError) => void, type: string = 'application/json') {
        const headers: { [key: string]: string } = {}
        headers['Content-Type'] = type
        headers['Accept'] = 'application/json'
        auth?.populateHeader(headers)

        this.httpData('DELETE', domain, endpoint, headers, params, onSuccess, onError)
    }
}