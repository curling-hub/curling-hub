import hostSignupSchema from '../components/host/create/schema'

describe("Test host creation schema validation", () => {
    test("Validate should contain exact ice sheets", async () => {
        const input = {
            organization: 'Husky Version 3',
            website: 'http://example.com',
            phone: '(555) 555-5555',
            countryCode: '+1',
            address: '55th Ave',
            address2: '#555',
            city: 'New York City',
            state: 'NY',
            zip: '55555',
            country: 'USA',
            agreed: true,
            iceSheets: [1, 2, 3, 4, 5],
            namingScheme: '123',
            email: 'example@example.com',
            userId: 'cc1d5bdd-c18e-4b93-8c4f-98bc8699f079',
            phoneNumber: '+1(555) 555-5555',
            streetAddress: '55th Ave',
        }
        const output = await hostSignupSchema.validate(input)
        expect({...output}).toEqual(expect.objectContaining({
            'iceSheets': input.iceSheets.map((value) => `${value}`),
        }))
        expect(output.iceSheets).toHaveLength(input.iceSheets.length)
    })
})

export {}
