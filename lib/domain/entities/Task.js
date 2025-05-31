"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(id, title, description, createdAt, completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.completed = completed;
    }
    markAsCompleted() {
        this.completed = true;
    }
    markAsPending() {
        this.completed = false;
    }
    updateDetails(title, description) {
        this.title = title;
        this.description = description;
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map