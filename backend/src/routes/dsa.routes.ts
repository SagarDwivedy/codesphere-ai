import { Router } from 'express';
import { listProblems, getProblem, explainProblem } from '../controllers/dsa.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', listProblems);
router.get('/:slug', getProblem);
router.get('/:slug/explain', explainProblem);

export default router;