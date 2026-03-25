import Bookmark from '../models/bookmark.model';

export const addBookmark = async (userId: string, problemId: string) => {
  return Bookmark.create({ userId, problemId });
};

export const removeBookmark = async (userId: string, problemId: string) => {
  return Bookmark.findOneAndDelete({ userId, problemId });
};

export const getUserBookmarks = async (userId: string) => {
  return Bookmark.find({ userId }).populate(
    'problemId',
    'title slug difficulty category'
  );
};