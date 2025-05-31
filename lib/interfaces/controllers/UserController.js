"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const FirestoreUserRepository_1 = require("../../infrastructure/firebase/repositories/FirestoreUserRepository");
const CreateUser_1 = require("@/application/use-cases/user/CreateUser");
const FindUserByEmail_1 = require("@/application/use-cases/user/FindUserByEmail");
const userRepo = new FirestoreUserRepository_1.FirestoreUserRepository();
const createUser = new CreateUser_1.CreateUser(userRepo);
const findUser = new FindUserByEmail_1.FindUserByEmail(userRepo);
class UserController {
    static async find(req, res) {
        const { email } = req.params;
        if (!email)
            res.status(400).json({ message: 'Email is required' });
        try {
            const user = await findUser.execute(email);
            if (!user)
                res.status(404).json({ message: 'User not found' });
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async create(req, res) {
        const { email } = req.body;
        if (!email)
            res.status(400).json({ message: 'Email is required' });
        try {
            const user = await createUser.execute(email);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map