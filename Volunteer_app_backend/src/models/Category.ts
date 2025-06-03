import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  category:    string;
  description: string;
  projects:    Types.ObjectId[];
  charities:   Types.ObjectId[];
  createdAt:   Date;
  updatedAt:   Date;
}

const CategorySchema: Schema = new Schema({
  category:    { type: String, required: true, unique: true },
  description: { type: String ,required: true},
  projects:    [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  charities:   [{ type: Schema.Types.ObjectId, ref: 'Charity' }],
}, {
  timestamps: true,
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
