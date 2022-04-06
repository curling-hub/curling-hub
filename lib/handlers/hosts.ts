import { RowDataPacket } from 'mysql2'
import { pool } from '../db'
import { HostInfo } from '../models'


export async function hosts() {
    return 0
}

export async function getAllHosts(): Promise<HostInfo[]> {
    // TODO: Find out how hosts are stored in the db
    const query = `
        SELECT
            host_id,
            organization,
            website,
            phone_number,
            street_address,
            address_extras,
            city,
            state,
            zip,
            country,
            updated_at
        FROM host_profile;
    `
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        hostId: val['host_id'],
        organization: val['organization'],
        website: val['website'],
        phoneNumber: val['phone_number'],
        streetAddress: val['street_address'],
        addressExtras: val['address_extras'],
        city: val['city'],
        state: val['state'],
        zip: val['zip'],
        country: val['country'],
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

export async function getHostInfoById(hostId: string): Promise<HostInfo | null> {
    // TODO: implement host info query including the ice sheets info
    const query = `
        SELECT
            host_profile.host_id,
            host_profile.organization,
            host_profile.website,
            host_profile.phone_number,
            host_profile.street_address,
            host_profile.address_extras,
            host_profile.city,
            host_profile.state,
            host_profile.zip,
            host_profile.country,
            host_profile.updated_at,
            JSON_ARRAYAGG(ice_sheets.name) AS ice_sheets
        FROM host_profile
        INNER JOIN ice_sheets
            ON ice_sheets.host_id = host_profile.host_id
        WHERE host_profile.host_id = ?
        GROUP BY host_profile.host_id;
    `
    const [rows, _] = await pool.promise().query(query, [hostId])
    const r = rows as RowDataPacket[]
    if (r.length === 0) {
        return null
    }
    const val = r[0]
    return Object.assign({}, {
        hostId: val['host_id'],
        organization: val['organization'],
        website: val['website'],
        phoneNumber: val['phone_number'],
        streetAddress: val['street_address'],
        addressExtras: val['address_extras'],
        city: val['city'],
        state: val['state'],
        zip: val['zip'],
        country: val['country'],
        iceSheets: val['ice_sheets'].filter((val: string | null) => !!val),
    })
}
