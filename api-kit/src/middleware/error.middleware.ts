import { NextFunction, Request, Response } from "express"
import {HttpException} from "../interfaces"
import {logger} from "../utils/logger"

export function errorMiddleware(this: () => string, error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status: number = error.status || 500
    const message: string = error.message || "Something went wrong"
    const projectId: string = typeof this === 'function' ? this() : '000'
    const code = parseInt(`${projectId}${error.code}`)

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message} [${error.code}]`)
    res.status(status).json({message, code})
}
