import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks:[{type:mongoose.Types.ObjectId,ref:"Task",required:true}],
});
const User = mongoose.model("User", userSchema);
export default User;
