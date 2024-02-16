const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    minLength: [3, "Name cannot be less than 3 characters"],
    maxLength: [20, "Name cannot be more than 20 characters"],
  },
  completed: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
