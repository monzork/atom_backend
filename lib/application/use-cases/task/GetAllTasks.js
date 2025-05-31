"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTasks = void 0;
class GetAllTasks {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute() {
        return this.taskRepository.getAll();
    }
}
exports.GetAllTasks = GetAllTasks;
//# sourceMappingURL=GetAllTasks.js.map