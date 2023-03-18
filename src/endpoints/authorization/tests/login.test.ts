import sinon from 'sinon'
import {loginSystem} from "../authorization.endpoint";
import {login} from "../../../services/authorization/authorization.service";
import * as authorizationService from "../../../services/authorization/authorization.service";
import {IUser} from "../../../types";

/**
 * In this file we test the authorization endpoint.
 * We test the following cases:
 * 1. Login with valid credentials
 * 2. Login with invalid credentials
 * 3. Login with valid credentials but not verified
 * **/
describe('Authorization endpoint', () => {
    let req:any, res:any

    beforeEach(() => {
        req = { body: {} }
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy() }),
        }
    })

    it('should return an error when no credentials are provided', async () => {
        await loginSystem(req, res)
        sinon.assert.calledWith(res.json, {
            message: 'Bad credentials',
            data: 'Missing parameters',
            status: 400
        })
    })

    it('should return the logged in user when valid credentials are provided', async () => {
        req = {
            body: {
                username: 'testuser',
                password: 'testpass',
            },
        };
        res = {
            json: sinon.spy(),
        };
        const loginStub = sinon.stub(authorizationService, 'login');
        const user:IUser = {
            active: false,
            confirmationCode: "",
            confirmationCodeExpires: new Date(),
            createdAt: new Date(),
            id: 0,
            isConfirmed: false,
            person: {
                id: 0,
                email:"",
                firstName: "",
                lastName: "",
                gender: {
                    id: 0,
                    catalog: "",
                    code: "",
                    description: ""
                },
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            token: "",
            updatedAt: new Date(),
            username: 'testuser',
            password: 'testpass'
        }
        loginStub.withArgs(req.body.username, req.body.password).returns(Promise.resolve(user));

        await loginSystem(req, res);

        sinon.assert.calledWith(res.json, {
            message: 'User logged in',
            data: user,
            status: 200,
        });

        loginStub.restore();
    });

    it('should return an error when an exception is thrown', async () => {
        const error = new Error('Error logging in');
        const loginStub = sinon.stub(authorizationService, 'login');

        req = {
            body: {
                username: 'testuser',
                password: 'testpass',
            },
        };

        loginStub.withArgs(req.body.username, req.body.password).throws(error);

        await loginSystem(req, res);

        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(res.status().json, {
            message: 'Error logging in',
            data: error,
            status: 500,
        });
    })
})