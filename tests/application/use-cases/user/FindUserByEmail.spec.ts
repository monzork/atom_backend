import { FindUserByEmail } from '@/application/use-cases/user/FindUserByEmail';
import { User } from '@/domain/entities/User';
describe('FindUserByEmail', () => {
	const user = new User('1', 'user@example.com', new Date());
	const mockRepo = {
		findByEmail: jest.fn().mockResolvedValue(user),
		create: jest.fn(),
	};
	it('should return the user if found', async () => {
		const useCase = new FindUserByEmail(mockRepo);
		const result = await useCase.execute('user@example.com');
		expect(result).toEqual(user);
		expect(mockRepo.findByEmail).toHaveBeenCalledWith('user@example.com');
	});
	it('should return null if user not found', async () => {
		mockRepo.findByEmail = jest.fn().mockResolvedValue(null);
		const useCase = new FindUserByEmail(mockRepo);
		const result = await useCase.execute('notfound@example.com');
		expect(result).toBeNull();
		expect(mockRepo.findByEmail).toHaveBeenCalledWith('notfound@example.com');
	});
});
//# sourceMappingURL=FindUserByEmail.spec.js.map
