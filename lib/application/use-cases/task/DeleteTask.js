"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTask = void 0;
class DeleteTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id) {
        const existing = await this.taskRepository.findById(id);
        if (!existing)
            return false;
        await this.taskRepository.delete(id);
        return true;
    }
}
exports.DeleteTask = DeleteTask;
//# sourceMappingURL=DeleteTask.js.map