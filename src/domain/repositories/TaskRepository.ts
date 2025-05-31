import { Task } from '../entities/Task';

export interface TaskRepository {
	getAll(): Promise<Task[]>;
	findById(id: string): Promise<Task | null>;
	save(task: Task): Promise<void>;
	update(task: Task): Promise<void>;
	delete(id: string): Promise<void>;
	getPaginated(limit: number, startAfter?: Date): Promise<Task[]>;
}
