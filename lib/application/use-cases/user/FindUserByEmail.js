"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByEmail = void 0;
class FindUserByEmail {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        return this.userRepository.findByEmail(email);
    }
}
exports.FindUserByEmail = FindUserByEmail;
//# sourceMappingURL=FindUserByEmail.js.map