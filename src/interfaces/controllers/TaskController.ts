import { Request, Response } from 'express';
import { FirestoreTaskRepository } from '@/infrastructure/firebase/repositories/FirestoreTaskRepository';
import { CreateTask } from '@/application/use-cases/task/CreateTask';
import { UpdateTask } from '@/application/use-cases/task/UpdateTask';
import { GetAllTasks } from '@/application/use-cases/task/GetAllTasks';
import { DeleteTask } from '@/application/use-cases/task/DeleteTask';
import { GetTasksPaginated } from '@/application/use-cases/task/GetTasksPaginated';

const taskRepository = new FirestoreTaskRepository();
const createTaskUseCase = new CreateTask(taskRepository);
const getAllTasks = new GetAllTasks(taskRepository);
const updateTask = new UpdateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);
const getTasksPaginated = new GetTasksPaginated(taskRepository);

export class TaskController {
	static async create(req: Request, res: Response) {
		const { title, description } = req.body;

		if (!title || !description) {
			res.status(400).json({ message: 'Title and description are required' });
			return;
		}

		try {
			const task = await createTaskUseCase.execute({ title, description });
			res.status(201).json(task);
		} catch (error) {
			console.error('Error creating task:', error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	static async getAll(req: Request, res: Response) {
		try {
			const tasks = await getAllTasks.execute();
			res.json(tasks);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	static async update(req: Request, res: Response) {
		const id = req.params.id;
		const { title, description, completed } = req.body;

		try {
			const updated = await updateTask.execute({ id, title, description, completed });
			if (!updated) {
				res.status(404).json({ message: 'Task not found' });
				return;
			}

			res.json(updated);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	static async remove(req: Request, res: Response) {
		const id = req.params.id;

		try {
			const deleted = await deleteTask.execute(id);
			if (!deleted) {
				res.status(404).json({ message: 'Task not found' })
				return;
			};

			res.status(204).send();
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	static async getPaginated(req: Request, res: Response) {
		const limit = parseInt(req.query.limit as string) || 10;
		const after = req.query.after as string;

		const startAfter = after ? new Date(after) : undefined;

		try {
			const tasks = await getTasksPaginated.execute({ limit, startAfter });
			res.json(tasks);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
}
