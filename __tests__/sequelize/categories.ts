import { sequelize } from '../../lib/db'
import * as DbModels from '../../lib/db_model'
import type { Category } from '../../lib/models'

describe("Category table operations", () => {

    beforeAll(async () => {
        // Synchronize (create if not exists) tables
        await sequelize.sync()
    })

    beforeEach(async () => {
        // Remove all entries before each test
        await DbModels.CategoryModel.destroy({ where: {} })
    })

    test("Table should be empty", async () => {
        const expected: Category[] = []
        await expect(DbModels.CategoryModel.findAll())
            .resolves
            .toEqual(expected)
    })

    test("Insert should succeed", async () => {
        const input = {
            name: 'Open',
        }
        const expected = Object.assign({}, input)
        await expect(DbModels.CategoryModel.create(input))
            .resolves
            .toEqual(expect.objectContaining(expected))
    })

    test("Bulk insert should succeed", async () => {
        const input = [
            { name: 'Open' },
            { name: 'Mixed' },
            { name: 'Senior' },
        ]
        const expected = input.map((item) => Object.assign({}, item))
        await expect(DbModels.CategoryModel.bulkCreate(input))
            .resolves
            .toHaveLength(expected.length)
    })
})

export {}
