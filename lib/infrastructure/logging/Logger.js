"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static info(message, context) {
        console.log(`[INFO] ${message}`, context ?? '');
    }
    static warn(message, context) {
        console.warn(`[WARN] ${message}`, context ?? '');
    }
    static error(message, context) {
        console.error(`[ERROR] ${message}`, context ?? '');
    }
    static debug(message, context) {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(`[DEBUG] ${message}`, context ?? '');
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map