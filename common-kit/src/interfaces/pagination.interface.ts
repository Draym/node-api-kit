export interface PageRequest {
    page: string
    pageSize: string
}

export interface PageResponse {
    page: number
    pageSize: number
    remaining: boolean
}