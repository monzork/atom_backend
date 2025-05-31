"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOrCreateUser = void 0;
const User_1 = require("@/domain/entities/User");
const uuid_1 = require("uuid");
class FindOrCreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        const existing = await this.userRepository.findByEmail(email);
        if (existing)
            return existing;
        const newUser = new User_1.User((0, uuid_1.v4)(), email, new Date());
        await this.userRepository.create(newUser);
        return newUser;
    }
}
exports.FindOrCreateUser = FindOrCreateUser;
