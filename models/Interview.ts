import mongoose, { Schema, model, Types } from 'mongoose';

export interface IInterview {
candidateId: Types.ObjectId;
jobId?: Types.ObjectId;
type: 'mock' | 'real';
questions: {
question: string;
answer?: string;
feedback?: string;
score?: number;
}[];
overallScore?: number;
feedback?: string;
status: 'pending' | 'completed' | 'in-progress';
duration: number; // in minutes
scheduledAt?: Date;
completedAt?: Date;
createdAt?: Date;
updatedAt?: Date;
}

const InterviewSchema = new Schema<IInterview>(
{
candidateId: {
type: Schema.Types.ObjectId,
ref: 'User',
required: true,
},
jobId: {
type: Schema.Types.ObjectId,
ref: 'Job',
},
type: {
type: String,
enum: ['mock', 'real'],
required: true,
},
questions: [
{
question: {
type: String,
required: true,
},
answer: {
type: String,
},
feedback: {
type: String,
},
score: {
type: Number,
min: 0,
max: 10,
},
},
],
overallScore: {
type: Number,
min: 0,
max: 10,
},
feedback: {
type: String,
},
status: {
type: String,
enum: ['pending', 'completed', 'in-progress'],
default: 'pending',
},
duration: {
type: Number,
default: 30,
},
scheduledAt: {
type: Date,
},
completedAt: {
type: Date,
},
},
{
timestamps: true,
}
);

const Interview =
mongoose.models.Interview || model<IInterview>('Interview', InterviewSchema);

export default Interview;