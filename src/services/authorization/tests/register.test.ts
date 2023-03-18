import sinon from "sinon";
import {User} from "../../../entities/User";
import {registerUser} from "../authorization.service";

/**
 * In this file we are going to test the register function
 * into the authorization service
 * **/

describe("Register Service", () => {
    it("Should throw error when user is not created", async () => {
        const error = new Error("User not created")
        const UserStub = sinon.stub(User, "create");
        UserStub.withArgs({}).throws(error)
        try {
            await registerUser({} as any)
        }catch (e:any) {
            expect(e.message).toBe("User not created")
        }
    })
})