import { Task } from '@/domain/entities/Task';
import { TaskRepository } from '@/domain/repositories/TaskRepository';
import { v4 as uuidv4 } from 'uuid';

export interface CreateTaskInput {
	title: string;
	description: string;
}

export class CreateTask {
	constructor(private readonly taskRepository: TaskRepository) {}

	async execute(input: CreateTaskInput): Promise<Task> {
		const task = new Task(uuidv4(), input.title, input.description, new Date(), false);

		await this.taskRepository.save(task);
		return task;
	}
}
