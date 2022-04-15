import addMatchSchema from '../components/profile/addMatch/schema'


describe("Yup required schema", () => {

    test("Validation should fail when fields are empty", async () => {
        const input = {}
        await expect(addMatchSchema.validate(input))
            .rejects
            .toThrow()
    })

    test("Validation should pass when fields are given", async () => {
        const input = {
            currentTeam: 1,
            matchResult: 'Win',
            date: '2022-04-03',
            opponent: 2,
            category: 2,
            location: 'Host 1',
            sheetOfIce: 'Left',
        }
        const expected = Object.assign({}, input, {
            date: new Date('2022-04-03'),
        })
        await expect(addMatchSchema.validate(input))
            .resolves
            .toStrictEqual(expected)
    })
})

export {}