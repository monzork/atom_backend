import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { v4 as uuidv4 } from 'uuid';

export class FindOrCreateUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(email: string): Promise<User> {
		const existing = await this.userRepository.findByEmail(email);
		if (existing) return existing;

		const newUser = new User(uuidv4(), email, new Date());
		await this.userRepository.create(newUser);
		return newUser;
	}
}
