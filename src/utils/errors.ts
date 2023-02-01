import {ErrorCode} from "../enums"
import {isNotEmpty} from "./checks"
import {HttpException} from "../interfaces"

export class Errors {
   static NOT_IMPLEMENTED = (reason: string) => new HttpException(ErrorCode.NOT_IMPLEMENTED, `Route is not implemented, ${reason}.`)
   static INVALID_Parameter = (reason: string) => new HttpException(ErrorCode.INVALID_Parameter, `${reason}`)
}

export function extractError(error): string {
    return isNotEmpty(error.message) ? error.message : JSON.stringify(error)
}