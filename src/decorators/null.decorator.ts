import {ValidateIf} from "class-validator"
import {isNotNull} from "../utils/checks"

export const SkipNull = () => ValidateIf((object, value) => isNotNull(value))