import {ValidateIf} from "class-validator"
import {isNotNull} from "@d-lab/common-kit"

export const SkipNull = () => ValidateIf((object, value) => isNotNull(value))