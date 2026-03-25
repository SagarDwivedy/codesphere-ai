import mongoose, { Document, Schema } from 'mongoose';

export type MessageRole = 'user' | 'assistant';

export type ChatCategory =
  | 'general'
  | 'dsa'
  | 'code'
  | 'system-design'
  | 'other';

export interface IMessage {
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  category: ChatCategory;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'New Chat',
      trim: true,
    },
    category: {
      type: String,
      enum: ['general', 'dsa', 'code', 'system-design', 'other'],
      default: 'general',
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>('Chat', chatSchema);