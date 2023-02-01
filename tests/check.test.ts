import {isEmpty} from "../src/utils/checks"

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
})