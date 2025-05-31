import { CreateUser } from '@/application/use-cases/user/CreateUser';
import { User } from '@/domain/entities/User';
describe('CreateUser', () => {
	const mockRepo = {
		create: jest.fn(),
		findByEmail: jest.fn(),
	};
	it('should create a user and call repository.create', async () => {
		const useCase = new CreateUser(mockRepo);
		const user = await useCase.execute('test@example.com');
		expect(user.email).toBe('test@example.com');
		expect(mockRepo.create).toHaveBeenCalledWith(expect.any(User));
	});
});
//# sourceMappingURL=CreateUser.spec.js.map
