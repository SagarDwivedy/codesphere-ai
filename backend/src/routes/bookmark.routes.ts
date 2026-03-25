import { Router } from 'express';
import {
  bookmark,
  unbookmark,
  getBookmarks,
} from '../controllers/bookmark.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.post('/', bookmark);
router.delete('/:problemId', unbookmark);
router.get('/', getBookmarks);

export default router;