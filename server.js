const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let tasks = [];

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// CREATE task
app.post('/api/tasks', (req, res) => {
    const task = {
        id: Date.now(),
        text: req.body.text,
        status: "Pending"
    };
    tasks.push(task);
    res.json(task);
});

// UPDATE task (edit + status)
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.text = req.body.text ?? task.text;
        task.status = req.body.status ?? task.status;
        res.json(task);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
