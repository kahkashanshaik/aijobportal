import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IJob extends Document {
  _id: Types.ObjectId;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  experience: string;
  recruiterId: Types.ObjectId;
  status: 'active' | 'closed' | 'draft';
  applications: string[]; // Array of candidate IDs
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [String],
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'remote'],
    required: true,
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD',
    },
  },
  skills: [String],
  experience: String,
  recruiterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active',
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);