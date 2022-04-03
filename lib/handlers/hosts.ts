import { RowDataPacket } from 'mysql2'
import { pool } from '../db'


export async function hosts() {
    return 0
}

export async function getAllHosts() {
    // TODO: Find out how hosts are stored in the db
    const query = `SELECT NULL AS team_id, NULL as name, NULL as rating;`
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating'],
    }))
}

export async function getIceSheetsByHostId(hostId: string) {
    const query = `
        SELECT
            host_id,
            name
        FROM ice_sheets
        WHERE host_id = ?;
    `
    const [rows, _] = await pool.promise().query(query, [hostId])
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        hostId: val['host_id'],
        name: val['name'],
    }))
}

export async function getHostInfoById(hostId: string) {
    // TODO: implement host info query including the ice sheets info
    return {}
}
