import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs"
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref:"User",
  }
});
const Task = mongoose.model("Task", taskSchema);
export default Task;
