const express = require('express');
const path = require('path');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "tasks-table";

// GET
app.get('/api/tasks', async (req, res) => {
    const data = await docClient.send(new ScanCommand({ TableName: TABLE }));
    res.json(data.Items || []);
});

// CREATE
app.post('/api/tasks', async (req, res) => {
    const newTask = {
        id: uuidv4(),
        text: req.body.text,
        status: "Pending"
    };

    await docClient.send(new PutCommand({
        TableName: TABLE,
        Item: newTask
    }));

    res.json(newTask);
});

// DELETE
app.delete('/api/tasks/:id', async (req, res) => {
    await docClient.send(new DeleteCommand({
        TableName: TABLE,
        Key: { id: req.params.id }
    }));

    res.json({ message: "Deleted" });
});

// UPDATE
app.put('/api/tasks/:id', async (req, res) => {
    await docClient.send(new UpdateCommand({
        TableName: TABLE,
        Key: { id: req.params.id },
        UpdateExpression: "set #s = :s, #t = :t",
        ExpressionAttributeNames: {
            "#s": "status",
            "#t": "text"
        },
        ExpressionAttributeValues: {
            ":s": req.body.status,
            ":t": req.body.text
        }
    }));

    res.json({ message: "Updated" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
