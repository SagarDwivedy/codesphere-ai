import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.model<IBookmark>('Bookmark', bookmarkSchema);