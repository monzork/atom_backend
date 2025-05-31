import { Request, Response } from 'express';
import { FirestoreUserRepository } from '../../infrastructure/firebase/repositories/FirestoreUserRepository';
import { CreateUser } from '@/application/use-cases/user/CreateUser';
import { FindUserByEmail } from '@/application/use-cases/user/FindUserByEmail';
import { FindOrCreateUser } from '@/application/use-cases/user/FindOrCreateUser';

const userRepo = new FirestoreUserRepository();
const createUser = new CreateUser(userRepo);
const findUser = new FindUserByEmail(userRepo);
const findOrCreateUser = new FindOrCreateUser(userRepo);

export class UserController {
	static async find(req: Request, res: Response) {
		const { email } = req.params;
		if (!email) res.status(400).json({ message: 'Email is required' });

		try {
			const user = await findUser.execute(email);
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.json(user);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	static async create(req: Request, res: Response) {
		const { email } = req.body;
		if (!email) {
			res.status(400).json({ message: 'Email is required' });
			return;
		}

		try {
			const user = await createUser.execute(email);
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	static async findOrCreate(req: Request, res: Response) {
		const { email } = req.body;
		if (!email) {
			res.status(400).json({ message: 'Email is required' });
			return;
		}

		try {
			const user = await findOrCreateUser.execute(email);
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
}
