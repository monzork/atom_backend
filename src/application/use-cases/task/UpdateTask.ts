import { TaskRepository } from '@/domain/repositories/TaskRepository';
import { Task } from '@/domain/entities/Task';

export interface UpdateTaskInput {
	id: string;
	title?: string;
	description?: string;
	completed?: boolean;
}

export class UpdateTask {
	constructor(private readonly taskRepository: TaskRepository) {}

	async execute(input: UpdateTaskInput): Promise<Task | null> {
		const existingTask = await this.taskRepository.findById(input.id);
		if (!existingTask) return null;

		if (input.title !== undefined) existingTask.title = input.title;
		if (input.description !== undefined) existingTask.description = input.description;
		if (input.completed !== undefined) existingTask.completed = input.completed;

		await this.taskRepository.update(existingTask);
		return existingTask;
	}
}
