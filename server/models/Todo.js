import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Work",
  },
  progress: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  category: {
    type: String,
    enum: ["todo", "progress", "done"],
    default: "todo",
  },
  date: {
    type: Date,
    default: Date.now, // Date.now() ni kerna
  },
  comments: [
    {
      type: String,
    },
  ],
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
