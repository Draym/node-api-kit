import {plainToInstance} from 'class-transformer'
import {validate, ValidationError} from 'class-validator'
import {RequestHandler} from 'express'
import {isNotNull} from "../utils/checks";
import {Errors} from "../utils/errors"

export const validateRequest = (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req, res, next) => {
        validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => {
                    if (isNotNull(error.constraints)) {
                        return Object.values(error.constraints!).join(" ")
                    } else {
                        return error.property
                    }
                }).join('\n')
                next(Errors.INVALID_Parameter(message))
            } else {
                next()
            }
        })
    }
}

export const validateQueryRequest = (
    type: any,
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return validateRequest(type, "query", skipMissingProperties, whitelist, forbidNonWhitelisted)
}

export const validatePathRequest = (
    type: any,
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return validateRequest(type, "params", skipMissingProperties, whitelist, forbidNonWhitelisted)
}