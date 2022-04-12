import { RowDataPacket } from 'mysql2'
import { pool } from '../db'
import * as DbModels from '../db_model'
import type { Category } from '../models'

export async function categories() {
    const conn = await pool.promise().getConnection()
    try {
        const [rows, _] = await conn.query('SELECT * FROM `categories`')
        const r = rows as RowDataPacket[]
        await conn.commit()
        return r
    } catch (e: any) {
        await conn.rollback()
    } finally {
        conn.release()
    }
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

