import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';
import { v4 as uuidv4 } from 'uuid';

export class CreateUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(email: string): Promise<User> {
		const user = new User(uuidv4(), email, new Date());
		await this.userRepository.create(user);
		return user;
	}
}
