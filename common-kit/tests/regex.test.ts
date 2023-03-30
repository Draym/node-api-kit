import {Regex} from "../src/utils/regex"

describe("Regex", () => {
    test("isNumber", done => {
        // @ts-ignore
        expect(Regex.isNumber(10.109)).toEqual(true)
        expect(Regex.isNumber("0")).toEqual(true)
        expect(Regex.isNumber(undefined)).toEqual(false)
        expect(Regex.isNumber(null)).toEqual(false)
        expect(Regex.isNumber("")).toEqual(false)
        done()
    })
    test("hasNumber", done => {
        // @ts-ignore
        expect(Regex.hasNumber(10.109)).toEqual(true)
        expect(Regex.hasNumber("0")).toEqual(true)
        expect(Regex.hasNumber("0aa")).toEqual(true)
        expect(Regex.hasNumber("bb0")).toEqual(true)
        expect(Regex.hasNumber(undefined)).toEqual(false)
        expect(Regex.hasNumber(null)).toEqual(false)
        expect(Regex.hasNumber("")).toEqual(false)
        done()
    })
    test("hasLowerCase", done => {
        // @ts-ignore
        expect(Regex.hasLowerCase(10.109)).toEqual(false)
        expect(Regex.hasLowerCase("0")).toEqual(false)
        expect(Regex.hasLowerCase("ab")).toEqual(true)
        expect(Regex.hasLowerCase("aCCCb")).toEqual(true)
        expect(Regex.hasLowerCase("ABC")).toEqual(false)
        expect(Regex.hasLowerCase(undefined)).toEqual(false)
        expect(Regex.hasLowerCase(null)).toEqual(false)
        expect(Regex.hasLowerCase("")).toEqual(false)
        done()
    })
    test("hasUpperCase", done => {
        // @ts-ignore
        expect(Regex.hasUpperCase(10.109)).toEqual(false)
        expect(Regex.hasUpperCase("0")).toEqual(false)
        expect(Regex.hasUpperCase("ab")).toEqual(false)
        expect(Regex.hasUpperCase("aCCCb")).toEqual(true)
        expect(Regex.hasUpperCase("ABC")).toEqual(true)
        expect(Regex.hasUpperCase(undefined)).toEqual(false)
        expect(Regex.hasUpperCase(null)).toEqual(false)
        expect(Regex.hasUpperCase("")).toEqual(false)
        done()
    })
})