import {Http} from "../src/utils/http"

describe("Http", () => {
    test("check fill endpoint", done => {
        const endpoint = "/api/:chainId/:collection/:tokenId"
        const data = {chainId: "ethereum", collection: "test", tokenId: "1"}
        expect(Http.fillEndpoint(endpoint, data)).toEqual("/api/ethereum/test/1")
        done()
    })
})