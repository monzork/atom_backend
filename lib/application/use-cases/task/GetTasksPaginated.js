"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTasksPaginated = void 0;
class GetTasksPaginated {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(input) {
        return this.taskRepository.getPaginated(input.limit, input.startAfter);
    }
}
exports.GetTasksPaginated = GetTasksPaginated;
