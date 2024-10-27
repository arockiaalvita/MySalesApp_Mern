const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const salesRepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tasks: [taskSchema] // Array of tasks
});

const SalesRep = mongoose.model('SalesRep', salesRepSchema);
module.exports = SalesRep;
