import {Response as ExpressResponse} from "express"

export interface Empty extends Meta {
}

interface Meta {
    code: number
    message: string
}

export interface Error extends Meta {
}

export interface Data<T> extends Meta {
    data: T
}

export interface PageResponse {
    page: number
    pageSize: number
    remaining: boolean
}

export interface Response<T> extends ExpressResponse<Data<T>> {
}

export function success<T>(res: Response<T>, data: T) {
    res.status(200).json({
        code: 0,
        message: "success",
        data: data
    })
}

export function error(res: ExpressResponse, status: number, code: number, message: string) {
    res.status(status).json({code, message})
}

export function empty(res: ExpressResponse) {
    res.status(200).json({code: 0, message: "success"})
}