export class Task {
	constructor(
		public readonly id: string,
		public title: string,
		public description: string,
		public readonly createdAt: Date,
		public completed: boolean = false
	) {}

	markAsCompleted() {
		this.completed = true;
	}

	markAsPending() {
		this.completed = false;
	}

	updateDetails(title: string, description: string) {
		this.title = title;
		this.description = description;
	}
}
