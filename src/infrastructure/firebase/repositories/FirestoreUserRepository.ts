import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import { db } from './firebase';

export class FirestoreUserRepository implements UserRepository {
	private collection = db.collection('users');

	async findByEmail(email: string): Promise<User | null> {
		const snapshot = await this.collection.where('email', '==', email).limit(1).get();
		if (snapshot.empty) return null;

		const doc = snapshot.docs[0];
		const data = doc.data();
		return new User(doc.id, data.email, data.createdAt.toDate());
	}

	async create(user: User): Promise<void> {
		await this.collection.doc(user.id).set({
			email: user.email,
			createdAt: user.createdAt,
		});
	}
}
