const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');
const postsRoutes = express.Router();
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const Webhook = require('../Model/webhook');

// Create a new webhook

postsRoutes.post('/POST/api/webhooks', async (req, res) => {
  try {
    const { url, events } = req.body;

    const webhook = new Webhook({ url, events });

    await webhook.save();

    res.status(201).json(webhook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all webhooks

postsRoutes.get('/GET/api/webhooks', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("/GET/api/webhooks", message)

    io.on('connection', function (socket) {
      console.log("connection", message)
      socket.emit('chatMessage', message);
    });
    res.status(200).json("Working");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = postsRoutes;
