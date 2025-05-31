import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

router.post('/', TaskController.create);
router.get('/', TaskController.getAll);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.remove);
router.get('/paginated', TaskController.getPaginated);

export default router;
