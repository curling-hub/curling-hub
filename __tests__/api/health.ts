import http from 'http'
import * as request from 'supertest'

import { sequelize } from '../../lib/db'
import setup from '../../lib/jest/supertest'
import apiHealthHandler from '../../pages/api/health'


describe('GET /health', () => {
    // Mock nextjs API handler
    const requestListener = setup(apiHealthHandler)

    beforeAll(async () => {
        await sequelize.sync()
    })

    it('/api/health should respond with db status of 1', async () => {
        const server = http.createServer(requestListener)
        const response = await request.agent(server).post('/api/health')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(response.body.status).toBe(1)
    })
})
