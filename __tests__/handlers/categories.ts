import { sequelize } from "../../lib/db"
import * as DbModels from '../../lib/db_model'
import { getAllCategories } from '../../lib/handlers/categories'


describe('Category operations', () => {

    beforeAll(async () => {
        // Populate tables if not already done so
        await sequelize.sync()
    })

    beforeEach(async () => {
        // Drop existing entries
        await DbModels.CategoryModel.destroy({ where: {} })
    })

    it('should return empty categories', async () => {
        await expect(getAllCategories())
            .resolves
            .toHaveLength(0)
    })

    it('should retrive inserted categories', async () => {
        // 1. Set up entries
        const data = [
            { name: 'Open' },
            { name: 'Mixed' },
            { name: 'Women' },
            { name: 'Men' },
            { name: 'U18' },
        ]
        await DbModels.CategoryModel.bulkCreate(data)
        // 2. Query
        await expect(getAllCategories())
            .resolves
            .toEqual(
                expect.arrayContaining(
                    data.map((item) => expect.objectContaining(item))
                )
            )
    })
})

export {}
