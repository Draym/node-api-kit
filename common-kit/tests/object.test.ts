import {merge, strictMerge} from "../src/utils/object"

describe("Object", () => {
    test("check merge null object", done => {
        const d1 = null
        const d2 = {name: undefined, v1: 2, v2: 3}
        expect(strictMerge(d1, d2)).toEqual({v1: 2, v2: 3})
        done()
    })

    test("check merge with allow empty", done => {
        const d1 = {
            w1: '',
            w2: 'death',
            w3: '',
            w4: '',
            w5: '',
            hue: 'blue',
            initial: 'D'
        }
        const d2  = {
            w1: 'planet',
            w2: '',
            w3: '',
            w4: '',
            w5: '',
            hue: 'yellow',
            initial: 'P'
        }
        expect(merge(d1, d2, true)).toEqual({
            w1: 'planet',
            w2: 'death',
            w3: '',
            w4: '',
            w5: '',
            hue: 'yellow',
            initial: 'P'
        })
        done()
    })


    test("strict merge object", done => {
        const d1 = {name: "test", v1: 1, v2: 3}
        const d2 = {name: undefined, v1: 2, v2: 3}
        expect(strictMerge(d1, d2)).toEqual({name: undefined, v1: 2, v2: 3})
        done()
    })

    test("merge object", done => {
        const d1 = {name: "test", v1: 1, v2: 3}
        const d2 = {name: undefined, v1: 2, v2: 3}
        expect(merge(d1, d2)).toEqual({name: "test", v1: 2, v2: 3})
        done()
    })

    test("merge object in cascade", done => {
        const d1 = {name: "test", v1: 1, v2: 3, v3: {desc: "t1", email: "t2"}, v4: {amount: 0}}
        const d2 = {name: undefined, v1: 2, v2: 3, v3: {email: "gmail"}, v5: {amount: 0}}
        expect(merge(d1, d2)).toEqual({name: "test", v1: 2, v2: 3, v3: {desc: "t1", email: "gmail"}, v4: {amount: 0}, v5: {amount: 0}})
        done()
    })
})