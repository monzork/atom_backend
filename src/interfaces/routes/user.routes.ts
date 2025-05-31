import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.get('/:email', UserController.find);
router.post('/', UserController.create);
router.post('/find-or-create', UserController.findOrCreate);

export default router;
