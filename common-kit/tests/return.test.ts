import {isNull} from "../src/utils/checks"

describe("Return", () => {
   const returnVoid = async (): Promise<void> => {}

    test("check if void return is correct", done => {
        returnVoid().then(r => {
            expect(isNull(r)).toEqual(true)
            done()
        })
    })
})