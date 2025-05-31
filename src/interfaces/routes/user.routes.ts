import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.get('/login', UserController.find);
router.post('/', UserController.create);
router.post('/find-or-create', UserController.findOrCreate);

export default router;
