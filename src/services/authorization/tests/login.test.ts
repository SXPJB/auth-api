import sinon from "sinon";
import {User} from "../../../entities/User";
import {login} from "../authorization.service";
import {encryptPassword} from "../../../constants/utils";


/**
 * In this test we are going to test the login function into the authorization service
 * **/
describe("Login Service", () => {

    it("Should throw error when user is not found", async () => {
        const UserStub = sinon.stub(User, "findOne");
        UserStub.withArgs({where: {}}).returns(Promise.resolve(null))
        try {
            const username = "testuser";
            const password = "testpass";
            await login(username, password)
        } catch (e: any) {
            expect(e.message).toBe("Error logging in: Bad credentials")
        }
        UserStub.restore()
    })

    it('should throw error when password is not correct ', async () => {
        const username = 'testuser';
        const password = 'wrongpassword';

        const encryptedPassword = await encryptPassword('correctpassword');
        const user:any = {
            username,
            password: encryptedPassword
        };

        const UserStb = sinon.stub(User, 'findOne').resolves(user);

        try {
            await login(username, password);
        } catch (e:any) {
            expect(e.message).toBe('Error logging in: Bad credentials');
        }

        UserStb.restore();
    });

    it("Should throw error when user is not confirmed", async () => {
        const username = "testuser";
        const password = "testpass";
        const encryptedPassword = await encryptPassword(password);
        const user:any = {
            username,
            password: encryptedPassword,
        }
        const UserStub = sinon.stub(User, "findOne").resolves(user);
        try {
            await login(username, password)
        }catch (e:any) {
            expect(e.message).toBe("Error logging in: User not confirmed")
        }
        UserStub.restore()
    })
    it("should return user with token", async () => {
        const username = "testuser";
        const password = "testpass";
        const encryptedPassword = await encryptPassword(password)
        const user:any = {
            username,
            password: encryptedPassword,
            isConfirmed: true,
            token: ""
        }
        const USerStub = sinon.stub(User, "findOne").resolves({
            save: sinon.stub().returns(Promise.resolve(user)),
            ...user
        })

        const userWithToken = await login(username, password)

        expect(userWithToken).toHaveProperty('token')
        USerStub.restore()
    })
})