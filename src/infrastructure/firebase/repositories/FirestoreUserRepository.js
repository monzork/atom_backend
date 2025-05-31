"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const User_1 = require("../../../domain/entities/User");
const firebase_1 = require("./firebase");
class FirestoreUserRepository {
    constructor() {
        this.collection = firebase_1.db.collection('users');
    }
    async findByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).limit(1).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        const data = doc.data();
        return new User_1.User(doc.id, data.email, data.createdAt.toDate());
    }
    async create(user) {
        await this.collection.doc(user.id).set({
            email: user.email,
            createdAt: user.createdAt,
        });
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
//# sourceMappingURL=FirestoreUserRepository.js.map