import {round} from "../src/utils/math"

describe("Converter", () => {
    test("round method", done => {
        expect(round(10.109)).toEqual(10)
        expect(round(10)).toEqual(10)
        expect(round(10.10)).toEqual(10)
        done()
    })
})