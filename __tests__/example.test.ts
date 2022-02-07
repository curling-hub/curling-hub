describe("Test suite name should go here", () => {
    test("Test name should go here", () => {
        // In actual test, replace result=10 with an actual function call
        const expected = 10
        const result = 10
        expect(result).toEqual(expected)
    })
    test("Test async function should work", async () => {
        const expected = 10
        const result = await (new Promise((resolve) => setTimeout(() => resolve(10), 500))) // Delay 500ms
        // const result = await asyncFunction()
        expect(result).toEqual(expected)
    })
})

export {}