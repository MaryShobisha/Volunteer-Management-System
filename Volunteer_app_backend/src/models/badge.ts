import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBadge extends Document {
  name: string;                     
  imageUrl: string;                 
  description: string;              
  projectsThreshold: number;        
  users: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const BadgeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    projectsThreshold: { type: Number, required: true, min: 1 },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model<IBadge>('Badge', BadgeSchema);
export default Badge;
