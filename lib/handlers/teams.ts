
import { RowDataPacket } from 'mysql2'
import { pool } from '../db'

import * as DbModels from '../db_model'

import type { TeamInfo } from '../models'

export async function teams() {
    return 0
}

export async function getAllTeams() {
    const query = `
        SELECT
            team_id,
            name,
            rating
        FROM team_profile
    `
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating'],
    }))
}

export async function getTeamInfo(team_Id: string) {
    const query = `
        SELECT DISTINCT
            tp.team_id,
            tp.name,
            tp.rating
        FROM team_profile tp
        WHERE tp.team_id = ` + team_Id
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    /* console.log(r) */
    return r.map((val) => ({
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating']
    }))
}

export async function getTeamMatches(teamId: string) {
    const query = `
        SELECT 
            mi.match_id,
            team_1.name as team_id_1,
            team_2.name as team_id_2,
            winner,
            cat.name as category,
            mi.date
        FROM match_info mi
        JOIN team_profile team_1 
        ON mi.team_id_1 = team_1.team_id
        JOIN team_profile team_2
        ON mi.team_id_2 = team_2.team_id
        JOIN categories cat
        ON mi.category_id = cat.category_id
        JOIN match_team_rel match_rel
        ON mi.match_id = match_rel.match_id
        WHERE match_rel.team_id = ` + teamId + `
        ORDER BY mi.date desc`

    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    /* console.log(r) */
    return r.map((val) => ({
        matchId: val['match_id'],
        team_1_name: val['team_id_1'],
        team_2_name: val['team_id_2'],
        winner: val[val['winner']] || null, // winner is literally 'team_id_1'
        category: val['category'],
        date: `${val['date']}`,
    }))
}

export async function getTeamContactInfo(teamId: string) {
    // TODO: SQL query and data format
    const query = `
        SELECT 
            tp.name,
            usr.email as email
        FROM  team_profile tp
        JOIN users usr
        ON usr.id = tp.team_id
        WHERE tp.team_id = ` + teamId
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        teamName: val['name'],
        teamEmail: val['email'],
    }))
}

export async function getTeamMembers(teamId: string) {
    const query = `
        SELECT DISTINCT
            tm.name as member_name
        FROM team_members tm
        WHERE tm.team_id = ` + teamId

    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        memberName: val['member_name'],
    }))
}

export async function getTeamCategories(teamId: string) {
    const query = `
        SELECT DISTINCT
            cat.name as category_name
        FROM team_members tm
        JOIN categories_rel cat_rel
        ON tm.team_id = cat_rel.team_id
        JOIN categories cat
        ON cat_rel.category_id = cat.category_id
        WHERE tm.team_id = ` + teamId

    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        categoryName: val['category_name'],
    }))
}

export async function getAllTeams(): Promise<TeamInfo[]> {
    return await DbModels.TeamInfoModel.findAll({
        raw: true,
    })
}

export async function getTeamById(teamId: number): Promise<TeamInfo | null> {
    return await DbModels.TeamInfoModel.findOne({
        where: {
            teamId: teamId,
        },
        raw: true,
    })
}

