import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { 
    type: String, 
    unique: true, 
    required: true 
},
  password: { 
    type: String, 
    required: true 
}

});

export const User = model<IUser>("User", UserSchema);
