import {ApiAccessRequire, ApiAccessType} from "../enums"

export interface ApiScope {
    module: string,
    require: ApiAccessRequire,
    type: ApiAccessType | null
}

export class ApiScopeImpl implements ApiScope {
    module: string
    require: ApiAccessRequire
    type: ApiAccessType | null

    constructor(module: string, require: ApiAccessRequire, type: ApiAccessType | null) {
        this.module = module
        this.require = require
        this.type = type
    }

    public static default(module: string, type: ApiAccessType | null): ApiScopeImpl {
        return new ApiScopeImpl(module, ApiAccessRequire.Read, type)
    }

    public read(): ApiScopeImpl {
        return new ApiScopeImpl(this.module, ApiAccessRequire.Read, this.type)
    }
    public write(): ApiScopeImpl {
        return new ApiScopeImpl(this.module, ApiAccessRequire.Write, this.type)
    }
    public personal(): ApiScopeImpl {
        return new ApiScopeImpl(this.module, this.require, ApiAccessType.Personal)
    }
    public management(): ApiScopeImpl {
        return new ApiScopeImpl(this.module, this.require, ApiAccessType.Management)
    }
}