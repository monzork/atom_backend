import { TaskRepository } from '@/domain/repositories/TaskRepository';

export class DeleteTask {
	constructor(private readonly taskRepository: TaskRepository) {}

	async execute(id: string): Promise<boolean> {
		const existing = await this.taskRepository.findById(id);
		if (!existing) return false;

		await this.taskRepository.delete(id);
		return true;
	}
}
