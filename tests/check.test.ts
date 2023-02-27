import {isEmpty, isBoolean, isDate, isNumber, isString, isObject, isArray} from "../src/utils/checks"

describe("Checks", () => {
    test("isEmpty", done => {
        expect(isEmpty(10.109)).toEqual(false)
        expect(isEmpty([10])).toEqual(false)
        expect(isEmpty("0")).toEqual(false)
        expect(isEmpty(undefined)).toEqual(true)
        expect(isEmpty(null)).toEqual(true)
        expect(isEmpty("")).toEqual(true)
        expect(isEmpty([])).toEqual(true)
        done()
    })

    test("isString", done => {
        expect(isString(null)).toEqual(false)
        expect(isString(10.109)).toEqual(false)
        expect(isString([10])).toEqual(false)
        expect(isString("tutu")).toEqual(true)
        done()
    })

    test("isNumber", done => {
        expect(isNumber(null)).toEqual(false)
        expect(isNumber(10.109)).toEqual(true)
        expect(isNumber([10])).toEqual(false)
        expect(isNumber("tutu")).toEqual(false)
        expect(isNumber(10)).toEqual(true)
        done()
    })

    test("isBoolean", done => {
        expect(isBoolean(null)).toEqual(false)
        expect(isBoolean(1)).toEqual(false)
        expect(isBoolean([10])).toEqual(false)
        expect(isBoolean("false")).toEqual(false)
        expect(isBoolean(true)).toEqual(true)
        expect(isBoolean(false)).toEqual(true)
        done()
    })

    test("isDate", done => {
        expect(isDate(null)).toEqual(false)
        expect(isDate(10.109)).toEqual(false)
        expect(isDate([10])).toEqual(false)
        expect(isDate("tutu")).toEqual(false)
        expect(isDate("2023-10-01")).toEqual(true)
        expect(isDate("2023-10-01T00:00:00")).toEqual(true)
        expect(isDate(new Date())).toEqual(true)
        done()
    })

    test("isObject", done => {
        expect(isObject(null)).toEqual(false)
        expect(isObject(10.109)).toEqual(false)
        expect(isObject([10])).toEqual(false)
        expect(isObject("tutu")).toEqual(false)
        expect(isObject({})).toEqual(true)
        expect(isObject({date: new Date()})).toEqual(true)
        done()
    })

    test("isArray", done => {
        expect(isArray(null)).toEqual(false)
        expect(isArray(10.109)).toEqual(false)
        expect(isArray([10])).toEqual(true)
        expect(isArray("tutu")).toEqual(false)
        done()
    })
})