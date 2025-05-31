import { TaskRepository } from '@/domain/repositories/TaskRepository';
import { Task } from '@/domain/entities/Task';
import { db } from './firebase';

const collection = db.collection('tasks');

export class FirestoreTaskRepository implements TaskRepository {
	async getAll(): Promise<Task[]> {
		const snapshot = await collection.orderBy('createdAt', 'desc').get();
		return snapshot.docs.map((doc) => {
			const data = doc.data();
			return new Task(
				doc.id,
				data.title,
				data.description,
				data.createdAt.toDate(),
				data.completed
			);
		});
	}

	async findById(id: string): Promise<Task | null> {
		const doc = await collection.doc(id).get();
		if (!doc.exists) return null;

		const data = doc.data()!;
		return new Task(doc.id, data.title, data.description, data.createdAt.toDate(), data.completed);
	}

	async save(task: Task): Promise<void> {
		await collection.doc(task.id).set({
			title: task.title,
			description: task.description,
			createdAt: task.createdAt,
			completed: task.completed,
		});
	}

	async update(task: Task): Promise<void> {
		await collection.doc(task.id).update({
			title: task.title,
			description: task.description,
			completed: task.completed,
		});
	}

	async delete(id: string): Promise<void> {
		await collection.doc(id).delete();
	}

	async getPaginated(limit: number, startAfter?: Date): Promise<Task[]> {
		let query = collection.orderBy('createdAt', 'desc').limit(limit);

		if (startAfter) {
			query = query.startAfter(startAfter);
		}

		const snapshot = await query.get();
		return snapshot.docs.map((doc) => {
			const data = doc.data();
			return new Task(
				doc.id,
				data.title,
				data.description,
				data.createdAt.toDate(),
				data.completed
			);
		});
	}
}
