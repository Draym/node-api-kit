import {NextFunction} from "express"
import {isNull, throwIf} from "../utils/checks"
import {empty, Response, success} from "../interfaces"
import {Errors} from "../utils/errors"

export async function handle<Req, Res>(this: (request: Req, res?: Response<Res>) => Promise<Res>, req: Req, res: Response<Res>, next: NextFunction) {
    try {
        throwIf(typeof this !== 'function', Errors.NOT_IMPLEMENTED("missing handler"))
        const result = await this(req, res)
        if (isNull(result)) {
            empty(res)
        } else {
            success(res, result)
        }
    } catch (error) {
        next(error)
    }
}