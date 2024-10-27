const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile'); // Import profile routes
require('dotenv').config();

const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Initialize the database connection
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Use the authentication and profile routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { completed, subTaskIndex } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (subTaskIndex !== undefined) {
      task.subTasks[subTaskIndex].completed = completed;
    } else {
      task.completed = completed;
    }
    await task.save();
    res.json({ message: 'Work updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update work' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
