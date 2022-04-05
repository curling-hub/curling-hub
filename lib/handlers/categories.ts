import { RowDataPacket } from 'mysql2'
import pool from '../db'

export async function categories() {
    const [rows, _] = await pool.promise().query('SELECT * FROM `categories`')
    const r = rows as RowDataPacket[]
    return r
}