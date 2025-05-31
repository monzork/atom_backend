import { FindOrCreateUser } from '@/application/use-cases/user/FindOrCreateUser';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

describe('FindOrCreateUser', () => {
	const mockRepo: UserRepository = {
		findByEmail: jest.fn(),
		create: jest.fn(),
	};

	const email = 'test@example.com';

	it('should return existing user if found', async () => {
		const existing = new User('1', email, new Date());
		(mockRepo.findByEmail as jest.Mock).mockResolvedValue(existing);

		const useCase = new FindOrCreateUser(mockRepo);
		const result = await useCase.execute(email);

		expect(result).toEqual(existing);
		expect(mockRepo.findByEmail).toHaveBeenCalledWith(email);
		expect(mockRepo.create).not.toHaveBeenCalled();
	});

	it('should create and return new user if not found', async () => {
		(mockRepo.findByEmail as jest.Mock).mockResolvedValue(null);
		(mockRepo.create as jest.Mock).mockImplementation(() => Promise.resolve());

		const useCase = new FindOrCreateUser(mockRepo);
		const result = await useCase.execute(email);

		expect(result.email).toBe(email);
		expect(result.id).toBeDefined();
		expect(result.createdAt).toBeInstanceOf(Date);
		expect(mockRepo.create).toHaveBeenCalledWith(expect.any(User));
	});
});
