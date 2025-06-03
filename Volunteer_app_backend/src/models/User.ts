import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProjectApplication {
  projectId: Types.ObjectId;
  projectInterest: string;
  skillsInterests: string;
  previousExperience: string;
  certificate?: string;       
  weekdayAvailability: string;
  weekendAvailability: string;
  appliedAt: Date;
  category: string;
}


export interface IUser extends Document {
  fullName: string;
  dob: Date;
  contactNumber: string;
  email: string;
  address: string;
  password:string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  projects: IProjectApplication[];
  userPoints: Number;
  badges: Types.ObjectId[];
   userType: 'admin' | 'volunteer';
}

const ProjectApplicationSchema = new Schema<IProjectApplication>({
  projectId:               { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  projectInterest:         { type: String, required: true },
  skillsInterests:         { type: String, required: true },
  previousExperience:      { type: String, required: true },
  certificate:          { type: String },              
  weekdayAvailability:     { type: String, required: true },
  weekendAvailability:     { type: String, required: true },
  appliedAt:               { type: Date,   default: Date.now },
  category:                { type:String, required:true},
});

const UserSchema: Schema = new Schema({
  fullName:       { type: String, required: true },
  dob:            { type: Date,   required: true },
  contactNumber:  { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  address:        { type: String},
  password:       { type: String, required: true },
  emergencyContactName: { type: String},
  emergencyContactNumber: { type: String},
  projects:    [ProjectApplicationSchema],
  userPoints:  {type:Number,default:0},
  badges:       [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  userType:     { type: String,default:'volunteer' },
}, {
  timestamps: true,
});



const User = mongoose.model<IUser>('User', UserSchema);
export default User;
