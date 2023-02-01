import {PageRequest, PageResponse} from "../../interfaces"

export class Page {
    page: number
    pageSize: number

    constructor(page: number, pageSize: number) {
        this.page = page
        this.pageSize = pageSize
    }


    static from(req: PageRequest): Page {
        return new Page(Number.parseInt(req.page), Number.parseInt(req.pageSize))
    }

    paginate(query) {
        const offset = this.page * this.pageSize
        const limit = this.pageSize

        return {
            ...query,
            offset,
            limit,
        }
    }

    result(data: any[]): PageResponse {
        return {
            page: this.page,
            pageSize: this.pageSize,
            remaining: data.length == this.pageSize
        }
    }
}