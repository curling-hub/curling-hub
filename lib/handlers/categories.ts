import { RowDataPacket } from 'mysql2'
import pool from '../db'

export async function categories() {
    pool.query('SELECT `name` FROM `categories`', function(err, rows, fields) {
        if (err) throw err
        else return rows
    })
}