import { TaskRepository } from '@/domain/repositories/TaskRepository';
import { Task } from '@/domain/entities/Task';

export class GetAllTasks {
	constructor(private readonly taskRepository: TaskRepository) {}

	async execute(): Promise<Task[]> {
		return this.taskRepository.getAll();
	}
}
