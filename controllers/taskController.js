const Task = require("../models/taskModel");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-errors");

// GET: get all task
const getAllTask = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });
});

//POST: create task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//GET: get a single task
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params; 
  const task = await Task.findOne({ _id: taskID }); 
  if (!task) {
    // const error = new  Error("Not Found!!!");
    // err.status = 404;
    // return next(error)
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

//UPDATE: update a task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

//DELETE: delete a task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
