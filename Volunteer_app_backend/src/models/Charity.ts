import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICharityDonation {
  userId: Types.ObjectId;
  donatedPoints: number; 
}

export interface ICharity extends Document {
  title: string;
  category: Types.ObjectId[];
  name: string;
  description: string;
  donationDetails: ICharityDonation[]; 
}



const donationSchema = new Schema<ICharityDonation>({
  userId:               { type: Schema.Types.ObjectId, ref: 'User' },
  donatedPoints:         { type: Number},
});

const CharitySchema: Schema = new Schema({
  title:     { type: String, required: true },
  category:      { type: Schema.Types.ObjectId, ref: 'Category' },
  name:        { type: String },
  description:        { type: String },
  donationDetails:  [donationSchema],
}, {
  timestamps: true,
});

const Charity = mongoose.model<ICharity>('Charity', CharitySchema);
export default Charity;