import { CreateTask } from '@/application/use-cases/task/CreateTask';
import { TaskRepository } from '@/domain/repositories/TaskRepository';
import { Task } from '@/domain/entities/Task';

describe('CreateTask', () => {
	const mockRepo: TaskRepository = {
		save: jest.fn(),
		getAll: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		findById: jest.fn(),
		getPaginated: jest.fn(),
	};

	it('should create a task and call repository.save', async () => {
		const useCase = new CreateTask(mockRepo);
		const task = await useCase.execute({
			title: 'Test Task',
			description: 'This is a test',
		});

		expect(task.title).toBe('Test Task');
		expect(task.description).toBe('This is a test');
		expect(task.completed).toBe(false);
		expect(mockRepo.save).toHaveBeenCalledWith(expect.any(Task));
	});
});
