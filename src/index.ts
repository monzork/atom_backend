import express from 'express';
import cors from 'cors';
import routes from './interfaces/routes';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
