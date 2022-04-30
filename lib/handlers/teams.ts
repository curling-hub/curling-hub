import { RowDataPacket } from 'mysql2'
import { Op } from 'sequelize'
import { pool, sequelize } from '../db'

import * as DbModels from '../db_model'

import type { TeamInfo } from '../models'
import { TeamCreationForm } from '../models/team'

export async function teams() {
    return 0
}

export async function getTeamInfo(team_Id: string) {
    const query = `
        SELECT DISTINCT
            tp.team_id,
            tp.name,
            tp.rating
        FROM team_profile tp
        WHERE tp.team_id = ?`
        const queryArgs = [team_Id]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[]
    /* console.log(r) */
    return r.map((val) => ({
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating']
    }))
}

export async function populateTeamMatchesPage(teamId: string) {
    const matchInfo = await DbModels.MatchModel.findAll({
        where: {
            [Op.or]: [{teamId1: teamId}, {teamId2: teamId}]
        }
    })
    const teamNames = await DbModels.TeamInfoModel.findAll()
    const hostNames = await DbModels.HostInfoModel.findAll()

    var names = new Map()
    teamNames.map((team) => {
        let t = team.get()
        names.set(t.teamId, t.name)
    })
    var hosts = new Map()
    hostNames.map((host) => {
        let h = host.get()
        hosts.set(h.hostId, h.organization)
    })
    const matches = matchInfo.map((match) => match.get())
    
    return matches.map((match) => ({
        date: (1+match.date.getMonth()).toString()+
            '/'+
            match.date.getDate().toString()+
            '/'+
            match.date.getFullYear().toString()
            ,
        outcome: match.teamId1.toString() == teamId && match.winner == 'team_id_1' ? 'Win' : 
                 match.teamId1.toString() == teamId && match.winner == 'team_id_2' ? 'Loss' : 
                 match.teamId2.toString() == teamId && match.winner == 'team_id_2' ? 'Win' :
                 match.teamId2.toString() == teamId && match.winner == 'team_id_1' ? 'Loss' :
                 'Tie',
        opponent: match.teamId1.toString() == teamId ? names.get(match.teamId2) : names.get(match.teamId2),
        location: hosts.get(match.hostId),
        sheetOfIce: match.sheetOfIce,
        comment: match.comments
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
        WHERE match_rel.team_id = ?`
        + `
        ORDER BY mi.date desc`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[] 
    
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
        WHERE tp.team_id = ?`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
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
        WHERE tm.team_id = ?`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
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
        WHERE tm.team_id = ?`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
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

export async function getAllRankings() {
    const query = `
    SELECT p.team_id as ID, p.name as Team, g.rating as Rating, x.Changes, group_concat(t.name) as Players
    FROM team_profile p INNER JOIN team_members t ON p.team_id = t.team_id INNER join
    team_glicko_info g ON g.team_id = t.team_id left outer join 
    (
        select rh.team_id, group_concat(rh.rating) as Changes
        from rating_history rh INNER JOIN rating_periods rp on rp.rating_period_id = rh.rating_period_id
        group by rh.team_id
        order by rp.end_date
    ) as x on x.team_id = p.team_id
    GROUP BY t.team_id 
    ORDER BY g.rating DESC;
    `

    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    
    return r.map((val) => ({
        ID: val['ID'],
        Team: val['Team'],
        Rating: val['Rating'],
        Changes: val['Changes'] ? 
        val['Changes'].split(',').map((num: string) => parseInt(num)) : [], 
        Players: val['Players']
    }))
}

export async function createTeam(form: TeamCreationForm): Promise<any> {
    const result = await sequelize.transaction(async (t) => {
        // 1. Update the account type to `curler`
        await DbModels.UserModel.update({
            account_type: 'curler',
        }, {
            where: { email: form.email },
            transaction: t,
        })

        // 2. Create team
        const team = await DbModels.TeamInfoModel.create({
            name: form.name,
            rating: '700',  // TODO: choose a default rating
        }, {
            transaction: t,
        })

        // 2. Add categories to team
        await Promise.all(form.categories.map((categoryId) =>
            team.addCategory(categoryId, { transaction: t })
        ))

        // 3. Add team members to team
        await Promise.all(form.curlers.map((curlerInfo) =>
            DbModels.TeamMemberModel.create({
                teamId: team.teamId,
                name: curlerInfo.name,
            }, { transaction: t })
        ))

        return team.get()
    })
    return result
}