import { Request, Response } from 'express';
import {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
} from '../services/bookmark.service';

export const bookmark = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { problemId } = req.body;
    await addBookmark(userId, problemId);
    return res.status(201).json({ message: 'Bookmarked successfully' });
  } catch (error: any) {
    if (error.code === 11000)
      return res.status(400).json({ message: 'Already bookmarked' });
    return res.status(500).json({ message: error.message });
  }
};

export const unbookmark = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const problemId = req.params.problemId as string;
    await removeBookmark(userId, problemId);
    return res.status(200).json({ message: 'Bookmark removed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const bookmarks = await getUserBookmarks(userId);
    return res.status(200).json({ bookmarks });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};