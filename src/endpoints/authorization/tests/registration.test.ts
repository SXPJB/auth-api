import sinon from 'sinon';
import {register} from '../authorization.endpoint';
import * as authorizationService from '../../../services/authorization/authorization.service';
import {IUser} from '../../../types';

/**
 * In this file we test the registration endpoint.
 * We test the following cases:
 * 1. Register a user
 * 2. Register a user with invalid data (missing parameters) throws an error
 * **/
describe('Registration endpoint', () => {
  let req:any, res:any;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ json: sinon.spy() }),
    };
  });

  it('should register a user', async () => {
    const userData:IUser = {
      person: {
        id: 0,
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@gmail.com',
        gender: {
          id: 1,
          catalog:'',
          code:'',
          description:'',
        },
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id: 0,
      username: 'asdasd',
      password: '12345',
      token: '',
      isConfirmed: false,
      confirmationCode: '',
      confirmationCodeExpires: new Date(),
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    req.body = userData;

    const registerStub = sinon.stub(authorizationService, 'registerUser');
    const userDataResponse:IUser = {
      ...userData,
      token: '12345',
    };
    registerStub.withArgs(userData).returns(Promise.resolve(userDataResponse));

    await register(req, res);
    sinon.assert.calledWith(res.json, {
      message: 'User created',
      data: userDataResponse,
      status: 200,
    });
    registerStub.restore();
  });

  it('should throw an error when missing parameters', async () => {
    const error = new Error('Missing parameters');
    const registerStub = sinon.stub(authorizationService, 'registerUser');
    registerStub.withArgs(req.body).throws(error);
    await register(req, res);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.status().json, {
      message: 'User not created',
      data: error,
      status: 500,
    });
    registerStub.restore();
  });
});