import sinon from "sinon";
import * as authorizationService from "../../../services/authorization.service";
import {verify} from "../authorization.endpoint";

/**
 * In this test we are going to test the verifyUser function
 * **/
describe("Verify user endpoint", () => {
    let req: any, res: any

    beforeEach(() => {
        req = {
            params: {}
        }

        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({json: sinon.spy()}),
        }
    })

    it("should throw an error when missing parameters", async () => {
        await verify(req, res)
        sinon.assert.calledWith(res.json, {
            message: 'User not verified',
            data: 'Missing parameters',
            status: 400
        })
    })

    it("should verify a user", async () => {
        const userId = 1
        const confirmationCode = "12345"

        req.params = {
            userId,
            confirmationCode
        }

        const verifyStub = sinon.stub(authorizationService, "verifyUser")
        verifyStub.withArgs(userId, confirmationCode).returns(Promise.resolve())

        await verify(req, res)
        sinon.assert.calledWith(res.json, {
            message: "User verified",
            status: 200
        })
        verifyStub.restore()
    })

    it("should throw an error when the user is not verified", async () => {
        const error = new Error("User not verified")
        const userId = 1
        const confirmationCode = "12345"

        req.params = {
            userId,
            confirmationCode
        }

        const verifyStub = sinon.stub(authorizationService, "verifyUser")
        verifyStub.withArgs(userId, confirmationCode).throws(error)

        await verify(req, res)
        sinon.assert.calledWith(res.status().json, {
            message: "User not verified",
            data: error,
            status: 500
        })
        verifyStub.restore()
    })
})