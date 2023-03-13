import request from 'supertest'
import app from '../../app'

/**
 * This test is used to check if the healthcheck endpoint is working
 **/
describe('GET /healthcheck', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/healthcheck')
        expect(response.status).toBe(200)
    })
})