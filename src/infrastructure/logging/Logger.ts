export class Logger {
	static info(message: string, context?: any) {
		console.log(`[INFO] ${message}`, context ?? '');
	}

	static warn(message: string, context?: any) {
		console.warn(`[WARN] ${message}`, context ?? '');
	}

	static error(message: string, context?: any) {
		console.error(`[ERROR] ${message}`, context ?? '');
	}

	static debug(message: string, context?: any) {
		if (process.env.NODE_ENV !== 'production') {
			console.debug(`[DEBUG] ${message}`, context ?? '');
		}
	}
}
