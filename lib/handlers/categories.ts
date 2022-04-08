import * as DbModels from '../db_model'
import type { Category } from '../models'


export async function categories() {
    return 0
}

export async function getAllCategories(): Promise<Category[]> {
    const categories = await DbModels.CategoryModel.findAll()
    if (!categories) {
        return []
    }
    return categories.map((category) => (category.get()))
}

export async function getCategoriesByTeamId(teamId: number): Promise<Category[]> {
    const categories = await DbModels.CategoryModel.findAll({
        include: [{
            model: DbModels.TeamInfoModel,
            where: {
                teamId: teamId,
            },
            attributes: [],
        }],
    })
    if (!categories) {
        return []
    }
    return categories.map((category) => category.get())
}
