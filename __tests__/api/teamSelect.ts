import http from 'http'
import * as request from 'supertest'

import { sequelize } from '../../lib/db'
import * as DbModels from '../../lib/db_model'
import setup from '../../lib/jest/supertest'
import apiTeamSelectHandler from '../../pages/api/team/selected'


describe('GET /health', () => {
    // Mock nextjs API handler
    const requestListener = setup(apiTeamSelectHandler)

    beforeAll(async () => {
        await sequelize.sync()
    })

    it('/api/team/selected should respond with empty array', async () => {
        const server = http.createServer(requestListener)
        const response = await request.agent(server).post('/api/team/selected')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(response.body.data).toHaveLength(0)
    })

    it('/api/team/selected should respond with inserted entries', async () => {
        // 1. Setup data
        const team = await DbModels.TeamInfoModel.create({ name: 'Team 1' })
        const member = await DbModels.TeamMemberModel.create({ teamId: team.teamId, name: 'John Doe' })
        const teamGlicko = await DbModels.TeamGlickoInfoModel.create({
            teamId: team.teamId,
            rating: 2100,
            ratingDeviation: 50,
            volatility: 0.2,
        })
        const ratingPeriod = await DbModels.RatingPeriodModel.create({
            name: '2022-Q1',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-03-31'),
        })
        const ratingHistory = await DbModels.RatingHistoryModel.create({
            teamId: team.teamId,
            ratingPeriodId: ratingPeriod.ratingPeriodId,
            rating: 2100,
            ratingDeviation: 50,
            volatility: 0.2,
        })
        const expected = {
            ID: team.teamId,
            Team: team.name,
            Rating: 2100,
            Changes: [ 2100 ],
            Players: [ member.name ],
        }
        // 2. Query
        const server = http.createServer(requestListener)
        const response = await request.agent(server).post('/api/team/selected')
            .expect('Content-Type', /json/)
            .expect(200)
        // 3. Validate
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(expected),
            ])
        )
    })
})
