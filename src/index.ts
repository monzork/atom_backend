import express from 'express';
import cors from 'cors';
import routes from './interfaces/routes';
import { onRequest } from 'firebase-functions/v2/https';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
	res.send('Welcome to the API!');
});

if (process.env.NODE_ENV !== 'production') {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Dev server listening on port ${port}`);
	});
}

export const api = onRequest(app);
export default app;
