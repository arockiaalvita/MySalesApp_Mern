const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  salesRepId: mongoose.Schema.Types.ObjectId,
  subTasks: [subTaskSchema],
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
