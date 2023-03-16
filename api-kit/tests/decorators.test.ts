import {IsString, validate, ValidationError} from "class-validator"
import {isNotNull} from "../src/utils/checks"
import {SkipNull} from "../src/decorators/null.decorator"

class TestClass {
    @IsString()
    @SkipNull()
    name?: string
}


describe("Decorators", () => {
    test("check @IsNotNull", done => {
        const test: TestClass = new TestClass()
        validate(test, { skipMissingProperties:false, whitelist:true, forbidNonWhitelisted: true }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => {
                    if (isNotNull(error.constraints)) {
                        return Object.values(error.constraints!).join(" ")
                    } else {
                        return error.property
                    }
                }).join('\n')
                expect(message).toEqual("")
            } else {
                done()
            }
        })
    })
})