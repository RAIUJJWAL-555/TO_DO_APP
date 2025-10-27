const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task({
    text: req.body.text,
    isDone: req.body.isDone || false,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.text = req.body.text || task.text;
    task.isDone = req.body.isDone !== undefined ? req.body.isDone : task.isDone;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export for Netlify Functions
exports.handler = async (event, context) => {
  // Set up the serverless function
  return new Promise((resolve, reject) => {
    const server = require('http').createServer(app);

    server.listen(0, () => {
      const { port } = server.address();

      // Handle the request
      const req = {
        method: event.httpMethod,
        url: event.path.replace('/.netlify/functions/api', ''),
        headers: event.headers,
        body: event.body,
      };

      const res = {
        statusCode: 200,
        headers: {},
        body: '',
        setHeader: function(key, value) {
          this.headers[key] = value;
        },
        end: function(body) {
          this.body = body || '';
          resolve({
            statusCode: this.statusCode,
            headers: this.headers,
            body: this.body,
          });
        },
      };

      // Simple routing
      if (req.method === 'GET' && req.url === '/api/tasks') {
        Task.find().then(tasks => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(tasks));
        }).catch(err => {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: err.message }));
        });
      } else if (req.method === 'POST' && req.url === '/api/tasks') {
        const taskData = JSON.parse(event.body);
        const task = new Task({
          text: taskData.text,
          isDone: taskData.isDone || false,
        });
        task.save().then(newTask => {
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(newTask));
        }).catch(err => {
          res.statusCode = 400;
          res.end(JSON.stringify({ message: err.message }));
        });
      } else if (req.method === 'PUT' && req.url.startsWith('/api/tasks/')) {
        const id = req.url.split('/api/tasks/')[1];
        const taskData = JSON.parse(event.body);
        Task.findById(id).then(task => {
          if (!task) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Task not found' }));
            return;
          }
          task.text = taskData.text || task.text;
          task.isDone = taskData.isDone !== undefined ? taskData.isDone : task.isDone;
          return task.save();
        }).then(updatedTask => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(updatedTask));
        }).catch(err => {
          res.statusCode = 400;
          res.end(JSON.stringify({ message: err.message }));
        });
      } else if (req.method === 'DELETE' && req.url.startsWith('/api/tasks/')) {
        const id = req.url.split('/api/tasks/')[1];
        Task.findByIdAndDelete(id).then(task => {
          if (!task) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Task not found' }));
            return;
          }
          res.end(JSON.stringify({ message: 'Task deleted' }));
        }).catch(err => {
          res.statusCode = 500;
          res.end(JSON.stringify({ message: err.message }));
        });
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
      }

      server.close();
    });
  });
};
