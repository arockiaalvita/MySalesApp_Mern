const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  role: { type: String, enum: ['admin', 'salesrep'], required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
