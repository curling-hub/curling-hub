import * as DbModels from '../db_model'
import type { Category } from '../models'

export async function categories() {
    return await getAllCategories()
}

export async function getAllCategories(): Promise<Category[]> {
    const categories = await DbModels.CategoryModel.findAll()
    if (!categories) {
        return []
    }
    return categories.map((category) => (category.toJSON()))
}

export async function getCategoriesByTeamId(teamId: number): Promise<Category[]> {
    const categories = await DbModels.CategoryModel.findAll({
        include: [{
            model: DbModels.TeamInfoModel,
            where: {
                teamId: teamId,
            },
            as: 'Teams',    // has to match `as` in `belongsToMany`
            attributes: [], // don't include the team's fields in the result
        }],
    })
    if (!categories) {
        return []
    } 
    return categories.map((category) => category.toJSON())
}

