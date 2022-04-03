import { RowDataPacket } from 'mysql2'

import { pool } from '../db'
import type { Category } from '../models'


export async function categories() {
    return 0
}

export async function getAllCategories(): Promise<Category[]> {
    const query = `
        SELECT
            category_id,
            name
        FROM categories;
    `
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        categoryId: val["category_id"],
        name: val["name"],
    }))
}

export async function getCategoriesByTeamId(teamId: string): Promise<Category[]> {
    const query = `
        SELECT
            categories.category_id,
            categories.name
        FROM categories_rel
        INNER JOIN categories
            ON categories.category_id = categories_rel.category_id
        WHERE ? = categories_rel.team_id;
    `
    const [rows, _] = await pool.promise().query(query, [teamId])
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        categoryId: val["category_id"],
        name: val["name"],
    }))
}
