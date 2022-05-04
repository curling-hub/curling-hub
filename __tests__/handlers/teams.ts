import { date } from "yup"
import { sequelize } from "../../lib/db"
import * as DbModels from '../../lib/db_model'
import { getAllRankings, getTeamContactInfo, getTeamMatches } from '../../lib/handlers/teams'
import type { HostInfoBase } from "../../lib/models"
import { TeamCreationForm } from "../../lib/models/team"


describe('Team operations', () => {

    beforeAll(async () => {
        // Populate tables if not already done so
        await sequelize.sync()
    })

    beforeEach(async () => {
        // Drop existing entries
        await Promise.all([
            DbModels.TeamMemberModel.destroy({ where: {} }),
            DbModels.TeamGlickoInfoModel.destroy({ where: {} }),
            DbModels.RatingPeriodModel.destroy({ where: {} }),
            DbModels.RatingHistoryModel.destroy({ where: {} }),
            DbModels.UserModel.destroy({ where: {} }),
            DbModels.TeamAdminModel.destroy({ where: {} }),
            DbModels.TeamInfoModel.destroy({ where: {} }),
        ])
    })

    it('should return empty rankings', async () => {
        await expect(getAllRankings())
            .resolves
            .toHaveLength(0)
    })

    it('should retrieve inserted rankings', async () => {
        // 1. Setup entries
        const teamData = [
            { name: 'Team 1', rating: '' },
            { name: 'Team 2', rating: '' },
        ]
        const ratingPeriodData = {
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-03-31'),
            name: '2022-Q1',
        }
        const teamGlickoData = [
            // Team 1
            { rating: 600, ratingDeviation: 100, volatility: 0.5 },
            // Team 2
            { rating: 800, ratingDeviation: 50, volatility: 0.2 },
        ]
        const ratingHistoryData = [
            // Team 1
            [
                { rating: 400, ratingDeviation: 200, volatility: 0.4 },
            ],
            // Team 2
            [
                { rating: 500, ratingDeviation: 120, volatility: 0.2 },
            ],
        ]
        const teams = await DbModels.TeamInfoModel.bulkCreate(teamData)
        const ratingPeriod = await DbModels.RatingPeriodModel.create(ratingPeriodData)
        const teamGlickos = await Promise.all(teams.map((t, i: number) => (
            DbModels.TeamGlickoInfoModel.create({
                ...teamGlickoData[i],
                teamId: t.teamId,
            })
        )))
        const ratingHistory = await Promise.all(teams.map((t, i: number) => (
            DbModels.RatingHistoryModel.create({
                ...ratingHistoryData[i][0],
                ratingPeriodId: ratingPeriod.ratingPeriodId,
                teamId: t.teamId,
            })
        )))
        const expected = [
            {
                name: 'Team 1',
                teamId: teams[0].teamId,
                members: [],
                teamGlickoInfo: {
                    rating: 600,
                    ratingDeviation: 100,
                    volatility: 0.5,
                    teamId: teams[0].teamId,
                },
                ratingPeriods: [
                    {
                        RatingHistory: {
                            rating: 400,
                            ratingDeviation: 200,
                            ratingPeriodId: 1,
                            teamId: teams[0].teamId,
                            volatility: 0.4,
                        },
                        endDate: new Date('2022-03-31'),
                        name: '2022-Q1',
                        ratingPeriodId: ratingPeriod.ratingPeriodId,
                        startDate: new Date('2022-01-01'),
                    },
                ],
            },
            {
                name: 'Team 2',
                teamId: teams[1].teamId,
                members: [],
                teamGlickoInfo: {
                    rating: 800,
                    ratingDeviation: 50,
                    volatility: 0.2,
                    teamId: teams[1].teamId,
                },
                ratingPeriods: [
                    {
                        RatingHistory: {
                            rating: 500,
                            ratingDeviation: 120,
                            ratingPeriodId: ratingPeriod.ratingPeriodId,
                            teamId: teams[1].teamId,
                            volatility: 0.2,
                        },
                        endDate: new Date('2022-03-31'),
                        name: '2022-Q1',
                        ratingPeriodId: ratingPeriod.ratingPeriodId,
                        startDate: new Date('2022-01-01'),
                    },
                ],
            },
        ]
        // 2. Query & Validation
        await expect(getAllRankings())
            .resolves
            .toEqual(expect.arrayContaining(
                expected.map((e) => expect.objectContaining(e))
            ))
    })

    it('should retrieve inserted admins', async () => {
        // 1. Setup
        const userData = {
            id: '68249974-7875-44aa-80e7-2d270c1dd1cd',
            name: 'User 1',
            email: 'sample@example.com',
        }
        const teamData = {
            name: 'Team A',
        }
        const [ user, team ] = await Promise.all([
            DbModels.UserModel.create(userData),
            DbModels.TeamInfoModel.create(teamData),
        ])
        const admin = await DbModels.TeamAdminModel.create({
            teamId: team.teamId,
            userId: user.id,
        })
        const expected = {
            teamName: team.name,
            teamEmail: user.email,
        }
        // 2. Query & Validation
        await expect(getTeamContactInfo(team.teamId))
            .resolves
            .toEqual(expect.arrayContaining([
                expect.objectContaining(expected),
            ]))
    })

    it('should retrieve team matches', async () => {
        // 1. Setup
        //   - insert 2 teams
        //   - insert a host
        //   - insert matches
        const userData = {
            id: '68249974-7875-44aa-80e7-2d270c1dd1cd',
            name: 'User 1',
            email: 'sample@example.com',
        }
        const teamData = [
            { name: 'Team A' },
            { name: 'Team B' },
        ]
        const hostData: HostInfoBase = {
            hostId: userData.id,
            organization: 'Husky',
            website: 'http://example.com',
            phoneNumber: '(555) 555-5555',
            streetAddress: '55th Ave',
            city: 'New York City',
            state: 'New York',
            zip: '55555',
            country: 'US',
            status: 'accepted',
        }
        const [ hostUser, teams ] = await Promise.all([
            DbModels.UserModel.create(userData),
            DbModels.TeamInfoModel.bulkCreate(teamData),
        ])
        const hostInfo = await DbModels.HostInfoModel.create(hostData)
        const matchData = [
            {
                hostId: hostData.hostId,
                teamId1: teams[0].teamId,
                teamId2: teams[1].teamId,
                winner: 'team_id_1',
                sheetOfIce: 'A',
                comments: null,
                date: new Date('2022-05-02'),
            },
            {
                hostId: hostData.hostId,
                teamId1: teams[0].teamId,
                teamId2: teams[1].teamId,
                winner: 'team_id_2',
                sheetOfIce: 'B',
                comments: null,
                date: new Date('2022-05-04'),
            },
        ]
        const matches = await DbModels.MatchModel.bulkCreate(matchData)
        const matchTeamData = [
            { matchId: matches[0].matchId, teamId: teams[0].teamId },
            { matchId: matches[0].matchId, teamId: teams[1].teamId },
            { matchId: matches[1].matchId, teamId: teams[0].teamId },
            { matchId: matches[1].matchId, teamId: teams[1].teamId },
        ]
        await DbModels.MatchTeamRel.bulkCreate(matchTeamData)

        await expect(getTeamMatches(teams[0].teamId))
            .resolves
            .toHaveLength(2)
    })
})

export {}
