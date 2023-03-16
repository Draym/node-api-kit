import {Response as ExpressResponse} from "express"

export interface Empty {
}

export interface Error {
    code: number
    message: string
}

export interface PageResponse {
    page: number
    pageSize: number
    remaining: boolean
}

export interface Response<T> extends ExpressResponse<T> {
}

export function success<T>(res: Response<T>, data: T) {
    res.status(200).json(data)
}

export function error(res: ExpressResponse, status: number, code: number, message: string) {
    res.status(status).json({code, message})
}

export function empty(res: ExpressResponse) {
    res.status(200).json({})
}