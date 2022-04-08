import { RowDataPacket } from 'mysql2'
import pool from '../db'

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