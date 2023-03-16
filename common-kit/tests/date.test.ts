import {round} from "../src/utils/math"
import {toTimestamp, toUnixTimestamp} from "../src/utils/date"

describe("Date", () => {
    test("toTimestamp", done => {
        const date = new Date()
        const currentTimestamp = date.getTime()
        const currentUnix = round(currentTimestamp / 1000)

        expect(toTimestamp(date.toISOString())).toEqual(currentTimestamp)
        expect(toUnixTimestamp(date.toISOString())).toEqual(currentUnix)
        done()
    })
})