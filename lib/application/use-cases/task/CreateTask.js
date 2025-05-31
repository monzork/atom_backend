"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask = void 0;
const Task_1 = require("@/domain/entities/Task");
const uuid_1 = require("uuid");
class CreateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(input) {
        const task = new Task_1.Task((0, uuid_1.v4)(), input.title, input.description, new Date(), false);
        await this.taskRepository.save(task);
        return task;
    }
}
exports.CreateTask = CreateTask;
