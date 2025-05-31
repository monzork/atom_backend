"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
class UpdateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(input) {
        const existingTask = await this.taskRepository.findById(input.id);
        if (!existingTask)
            return null;
        if (input.title !== undefined)
            existingTask.title = input.title;
        if (input.description !== undefined)
            existingTask.description = input.description;
        if (input.completed !== undefined)
            existingTask.completed = input.completed;
        await this.taskRepository.update(existingTask);
        return existingTask;
    }
}
exports.UpdateTask = UpdateTask;
