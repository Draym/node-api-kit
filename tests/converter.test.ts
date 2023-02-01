import {toBoolean, toFloat, toInt} from "../src/utils/converter"

describe("Converter", () => {
    test("toInt", done => {
        expect(toInt("156")).toEqual(156)
        expect(toInt("156.11")).toEqual(156)
        expect(toInt(null)).toEqual(null)
        expect(toInt(undefined)).toEqual(null)
        done()
    })
    test("toFloat", done => {
        expect(toFloat("156")).toEqual(156)
        expect(toFloat("156.11")).toEqual(156.11)
        expect(toFloat(null)).toEqual(null)
        expect(toFloat(undefined)).toEqual(null)
        done()
    })
    test("toBoolean", done => {
        expect(toBoolean("true")).toEqual(true)
        expect(toBoolean("false")).toEqual(false)
        expect(toBoolean("1")).toEqual(true)
        expect(toBoolean("0")).toEqual(false)
        expect(toBoolean(null)).toEqual(null)
        expect(toBoolean(undefined)).toEqual(null)
        done()
    })
})