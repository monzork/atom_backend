import * as functions from 'firebase-functions';
import app from './src/index';

export const api = functions.https.onRequest(app);
