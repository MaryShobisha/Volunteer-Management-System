import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProject extends Document {
  projectName:      string;
  description:      string;
  location?:        string;
  dateTime?:        string;
  duration?:        string;
  fullDescription?: string;
  skillsRequired?:  string[];
  totalSlots?:      Number;
  users:            Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  projectName:     { type: String, required: true },
  description:     { type: String, required: true },
  location:        { type: String },
  dateTime:        { type: String },
  duration:        { type: String },
  fullDescription: { type: String },
  skillsRequired:  [{ type: String }],
  totalSlot:       {type: Number},
  users:           [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
