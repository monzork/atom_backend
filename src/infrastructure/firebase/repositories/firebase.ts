import * as admin from 'firebase-admin';

if (!admin.apps.length) {
	admin.initializeApp({
		projectId: process.env.FIREBASE_PROJECT_ID,
		credential: admin.credential.applicationDefault(),
	});
}

export const db = admin.firestore();
export { admin };
