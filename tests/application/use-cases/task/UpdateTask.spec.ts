import { UpdateTask } from '@/application/use-cases/task/UpdateTask';
import { Task } from '@/domain/entities/Task';

describe('UpdateTask', () => {
	const mockTask = new Task('1', 'Original Title', 'Original Description', new Date(), false);
	const mockRepo = {
		getAll: jest.fn(),
		findById: jest.fn().mockResolvedValue(mockTask),
		save: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		getPaginated: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should update task fields and call repository.update', async () => {
		const useCase = new UpdateTask(mockRepo);
		const result = await useCase.execute({
			id: '1',
			title: 'Updated Title',
			description: 'Updated Description',
			completed: true,
		});
		expect(result?.title).toBe('Updated Title');
		expect(result?.description).toBe('Updated Description');
		expect(result?.completed).toBe(true);
		expect(mockRepo.update).toHaveBeenCalledWith(expect.any(Task));
	});
	it('should return null if task not found', async () => {
		mockRepo.findById = jest.fn().mockResolvedValue(null);
		const useCase = new UpdateTask(mockRepo);
		const result = await useCase.execute({ id: '2', title: 'X' });
		expect(result).toBeNull();
		expect(mockRepo.update).not.toHaveBeenCalled();
	});
});
//# sourceMappingURL=UpdateTask.spec.js.map
