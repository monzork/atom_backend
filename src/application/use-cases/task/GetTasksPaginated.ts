import { TaskRepository } from '@/domain/repositories/TaskRepository';
import { Task } from '@/domain/entities/Task';
import { GetTasksPaginatedInput } from '@/application/dtos/GetTasksPaginatedInput';

export class GetTasksPaginated {
	constructor(private readonly taskRepository: TaskRepository) {}

	async execute(input: GetTasksPaginatedInput): Promise<Task[]> {
		return this.taskRepository.getPaginated(input.limit, input.startAfter);
	}
}
