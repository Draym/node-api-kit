import {ApiAccessRequire} from "../enums"

export default class ApiMethodAccess {
    public static methods = {
        get: ApiAccessRequire.Read,
        post: ApiAccessRequire.Write,
        put: ApiAccessRequire.Write,
        delete: ApiAccessRequire.Write,
        option: ApiAccessRequire.Write
    }

    public static getAccess(method: string): ApiAccessRequire {
        return this.methods[method.toLowerCase()] || ApiAccessRequire.Read
    }

    public static hasAccess(access: ApiAccessRequire, required: ApiAccessRequire): boolean {
        return access === ApiAccessRequire.ReadWrite || access === required
    }
}