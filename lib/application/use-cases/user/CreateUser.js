"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const User_1 = require("@/domain/entities/User");
const uuid_1 = require("uuid");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        const user = new User_1.User((0, uuid_1.v4)(), email, new Date());
        await this.userRepository.create(user);
        return user;
    }
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUser.js.map