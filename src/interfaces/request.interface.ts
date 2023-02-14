import {AuthData, CallerData} from "./auth.interface"
import {IsNumberString} from "class-validator"

interface Body<T> {
    body: T
}

interface Query<T> {
    query: T
}

interface Path<T> {
    params: T
}

interface Auth {
    auth: AuthData
    caller: CallerData
}

export type PathRequest<T> = Path<T>

export type AuthPathRequest<T> = Auth & Path<T>

export type BodyRequest<T> = Body<T>

export type BodyPathRequest<T1, T2> = Body<T1> & Path<T2>

export type AuthBodyRequest<T> = Auth & Body<T>

export type AuthBodyPathRequest<T1, T2> = Auth & Body<T1> & Path<T2>

export type AuthRequest = Auth

export type QueryRequest<T> = Query<T>

export type QueryPathRequest<T1, T2> = Query<T1> & Path<T2>

export type AuthQueryRequest<T> = Auth & Query<T>

export type AuthQueryPathRequest<T1, T2> = Auth & Query<T1> & Path<T2>

export interface EmptyRequest extends Express.Request {}

export class PageRequest {
    @IsNumberString()
    page: string
    @IsNumberString()
    pageSize: string
}