import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  userId?: string;
  clickCount: number;
  createdAt: Date;
  lastAccessed?: Date;
  isActive: boolean;
}

const UrlSchema: Schema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  userId: {
    type: String,
    required: false,
    index: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessed: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Create indexes for better performance (removed duplicate shortCode index)
UrlSchema.index({ userId: 1, createdAt: -1 });
UrlSchema.index({ createdAt: -1 });

export default mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema); 