import {ApiAccessRequire, ApiAccessType, ErrorCode} from "../enums"
import {isNotEmpty} from "./checks"
import {HttpException} from "../interfaces"

export const Errors = {
    SERVICE_Closed: (reason: string) => new HttpException(ErrorCode.SERVICE_Closed, `${reason}`),
    NOT_IMPLEMENTED: (reason: string) => new HttpException(ErrorCode.NOT_IMPLEMENTED, `Route is not implemented, ${reason}.`),
    SERVICE_PROVIDER_ApiError: (reason: string) => new HttpException(ErrorCode.SERVICE_PROVIDER_ApiError, `${reason}`),
    NOT_FOUND_User: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_User, `${reason}`),
    NOT_FOUND_Role: (userId: number, role: string) => new HttpException(ErrorCode.NOT_FOUND_Role, `User of id[${userId}] doesn't have the role[${role}].`),
    NOT_FOUND_RefreshToken: () => new HttpException(ErrorCode.NOT_FOUND_RefreshToken, `RefreshToken not found.`),
    NOT_FOUND_Application: (id: string) => new HttpException(ErrorCode.NOT_FOUND_Application, `Application not found for ${id}.`),
    NOT_FOUND_ApplicationUser: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_ApplicationUser, `Application Scope not found for ${reason}.`),
    REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
    REQUIRE_Role: (role: string) => new HttpException(ErrorCode.REQUIRE_Role, `User has not the required[${role}] role.`),
    REQUIRE_Whitelist: () => new HttpException(ErrorCode.REQUIRE_Whitelist, `User is not whitelisted.`),
    REQUIRE_Access: () => new HttpException(ErrorCode.REQUIRE_Access, `User has been suspended.`),
    REQUIRE_ApiKey: () => new HttpException(ErrorCode.REQUIRE_ApiKey, `Authentication ApiKey is missing.`),
    REQUIRE_APP_Scope: (module: string) => new HttpException(ErrorCode.REQUIRE_APP_Scope, `Application doesn't have access to ${module} apis.`),
    REQUIRE_APP_TypeAccess: (type: ApiAccessType, required: ApiAccessType) => new HttpException(ErrorCode.REQUIRE_APP_TypeAccess, `Application of ${type} type doesn't have access to ${required} apis.`),
    REQUIRE_APP_AccessRequire: (require: ApiAccessRequire) => new HttpException(ErrorCode.REQUIRE_APP_AccessRequire, `Application require the ${require} access to call this api.`),
    REQUIRE_Ownership: (reason: string) => new HttpException(ErrorCode.REQUIRE_Ownership, reason),
    REJECTED_Token: (reason: string) => new HttpException(ErrorCode.REJECTED_Token, `JWT rejected: ${reason}.`),
    INVALID_Token: (error: string) => new HttpException(ErrorCode.INVALID_Token, `JWT validation error: ${error}`),
    INVALID_Parameter: (reason: string) => new HttpException(ErrorCode.INVALID_Parameter, `${reason}`),
    INVALID_ApiKey: () => new HttpException(ErrorCode.INVALID_ApiKey, `Authentication ApiKey is invalid.`),
    EXPIRED_Token: () => new HttpException(ErrorCode.EXPIRED_Token, `Your token has expired. Please re-login or refresh your token.`),
    MISSING_Parameter: () => new HttpException(ErrorCode.MISSING_Parameter, `Request parameter not specified.`),
    MISSING_Filter: () => new HttpException(ErrorCode.MISSING_Filter, `Request filter not specified.`),
    RESTRICTED_Login: (email, amount: number, type: string) => new HttpException(ErrorCode.RESTRICTED_Login, `Login attempt has been restricted for email[${email}] for  ${amount}${type}.`),
    REJECTED_ApiKey: (reason: string) => new HttpException(ErrorCode.REJECTED_ApiKey, `ApiKey rejected: ${reason}.`),
}

export function extractError(error): string {
    return isNotEmpty(error.message) ? error.message : JSON.stringify(error)
}