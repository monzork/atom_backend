"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTaskRepository = void 0;
const Task_1 = require("@/domain/entities/Task");
const firebase_1 = require("./firebase");
const collection = firebase_1.db.collection('tasks');
class FirestoreTaskRepository {
    async getAll() {
        const snapshot = await collection.orderBy('createdAt', 'desc').get();
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Task_1.Task(doc.id, data.title, data.description, data.createdAt.toDate(), data.completed);
        });
    }
    async findById(id) {
        const doc = await collection.doc(id).get();
        if (!doc.exists)
            return null;
        const data = doc.data();
        return new Task_1.Task(doc.id, data.title, data.description, data.createdAt.toDate(), data.completed);
    }
    async save(task) {
        await collection.doc(task.id).set({
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
            completed: task.completed,
        });
    }
    async update(task) {
        await collection.doc(task.id).update({
            title: task.title,
            description: task.description,
            completed: task.completed,
        });
    }
    async delete(id) {
        await collection.doc(id).delete();
    }
    async getPaginated(limit, startAfter) {
        let query = collection.orderBy('createdAt', 'desc').limit(limit);
        if (startAfter) {
            query = query.startAfter(startAfter);
        }
        const snapshot = await query.get();
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Task_1.Task(doc.id, data.title, data.description, data.createdAt.toDate(), data.completed);
        });
    }
}
exports.FirestoreTaskRepository = FirestoreTaskRepository;
