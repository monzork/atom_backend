"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const FirestoreTaskRepository_1 = require("@/infrastructure/firebase/repositories/FirestoreTaskRepository");
const CreateTask_1 = require("@/application/use-cases/task/CreateTask");
const UpdateTask_1 = require("@/application/use-cases/task/UpdateTask");
const GetAllTasks_1 = require("@/application/use-cases/task/GetAllTasks");
const DeleteTask_1 = require("@/application/use-cases/task/DeleteTask");
const GetTasksPaginated_1 = require("@/application/use-cases/task/GetTasksPaginated");
const taskRepository = new FirestoreTaskRepository_1.FirestoreTaskRepository();
const createTaskUseCase = new CreateTask_1.CreateTask(taskRepository);
const getAllTasks = new GetAllTasks_1.GetAllTasks(taskRepository);
const updateTask = new UpdateTask_1.UpdateTask(taskRepository);
const deleteTask = new DeleteTask_1.DeleteTask(taskRepository);
const getTasksPaginated = new GetTasksPaginated_1.GetTasksPaginated(taskRepository);
class TaskController {
    static async create(req, res) {
        const { title, description } = req.body;
        if (!title || !description) {
            res.status(400).json({ message: 'Title and description are required' });
        }
        try {
            const task = await createTaskUseCase.execute({ title, description });
            res.status(201).json(task);
        }
        catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async getAll(req, res) {
        try {
            const tasks = await getAllTasks.execute();
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async update(req, res) {
        const id = req.params.id;
        const { title, description, completed } = req.body;
        try {
            const updated = await updateTask.execute({ id, title, description, completed });
            if (!updated)
                res.status(404).json({ message: 'Task not found' });
            res.json(updated);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async remove(req, res) {
        const id = req.params.id;
        try {
            const deleted = await deleteTask.execute(id);
            if (!deleted)
                res.status(404).json({ message: 'Task not found' });
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async getPaginated(req, res) {
        const limit = parseInt(req.query.limit) || 10;
        const after = req.query.after;
        const startAfter = after ? new Date(after) : undefined;
        try {
            const tasks = await getTasksPaginated.execute({ limit, startAfter });
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.TaskController = TaskController;
