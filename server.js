require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ DB connected to Atlas...");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

// Define Schema & Model
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

// API Routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ task: req.body.task });
  await newTodo.save();
  res.json(newTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
