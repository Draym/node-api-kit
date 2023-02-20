import {isNotEmpty, isNull} from "../checks"
import Op from "./op"

export function eq(filters: { [key: string]: string | number | boolean | null | undefined}): Filter {
    return new Filter().equals(filters)
}
export function gt(filters: { [key: string]: Date | null | undefined}): Filter {
    return new Filter().gt(filters)
}
export function lt(filters: { [key: string]: Date | null | undefined}): Filter {
    return new Filter().lt(filters)
}
export function include(filters: { [key: string]: string[] | number[] | null | undefined}): Filter {
    return new Filter().in(filters)
}
export function like(filters: { [key: string]: string | null | undefined}): Filter {
    return new Filter().like(filters)
}

export class Filter {

    private where = {}

    constructor() {
    }

    public equals(filters: { [key: string]: string | number | boolean | null | undefined}): Filter {
        for (const key in filters) {
            if (isNotEmpty(filters[key])) {
                this.where[key] = filters[key]
            }
        }
        return this
    }

    public in(filters: { [key: string]: string[] | number[] | undefined}): Filter {
        for (const key in filters) {
            if (isNotEmpty(filters[key])) {
                this.where[key] = filters[key]
            }
        }
        return this
    }

    public like(filters: { [key: string]: string | null | undefined}): Filter {
        for (const key in filters) {
            if (isNotEmpty(filters[key])) {
                this.merge(key, {
                    [Op.like]: filters[key]
                })
            }
        }
        return this
    }

    public gt(filters: { [key: string]: Date | null | undefined}, equals: boolean = true): Filter {
        for (const key in filters) {
            if (isNotEmpty(filters[key])) {
                this.merge(key, {
                    [equals ? Op.gte : Op.gt]: filters[key]
                })
            }
        }
        return this
    }

    public lt(filters: { [key: string]: Date | null | undefined}, equals: boolean = true): Filter {
        for (const key in filters) {
            if (isNotEmpty(filters[key])) {
                this.merge(key, {
                    [equals ? Op.lte : Op.lt]: filters[key]
                })
            }
        }
        return this
    }

    private merge(key: string, data: {}) {
        if (isNull(this.where[key])) {
            this.where[key] = data
        } else {
            this.where[key] = {...this.where[key], ...data}
        }
    }

    public get() {
        return {
            where: this.where
        }
    }

    public stringify(): string {
        return JSON.stringify(this.where)
    }
}