import mysql, { OkPacket, RowDataPacket } from 'mysql2'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const {
    mysql_host,
    mysql_port,
    mysql_user,
    mysql_password,
    mysql_database,
} = serverRuntimeConfig

const pool = mysql.createPool({
    host: mysql_host,
    port: mysql_port,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database
})

export async function health(): Promise<Number> {
    const query = `SELECT 1 AS status`
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    if (r.length === 0) {
        return 0
    }
    return r[0]['status'] as Number
}

export default pool