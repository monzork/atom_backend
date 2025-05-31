import * as admin from 'firebase-admin';
import serviceAccount from '@/../../ServiceAccountKey.json';

if (!admin.apps.length) {
	admin.initializeApp({
		projectId: process.env.FIREBASE_PROJECT_ID,
		credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	});
}

export const db = admin.firestore();
export { admin };
