const express = require('express');
const app = express();
const { Server } = require("socket.io");
const http = require('http');
app.use(express.json())
const postsRoutes = express.Router();
const cors = require('cors');
app.use(cors({
	origin: 'https://unileverdev.sharepoint.com'
}));
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {
	cors: {
		origin: 'https://unileverdev.sharepoint.com',
	},
});

app.use(postsRoutes);
let socketC;
socketC = io.on('connection', function (socket) {
	console.log("user connected")
});
postsRoutes.get('/GET', async (req, res) => {
	try {
		const { message } = req.query;
		socketC.emit("manjunath.s21@unileverpp.com", message);

		res.status(200).json(message);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
const PORT = process.env.PORT || 3030;

server.listen(PORT, function () {
	console.log('listening on *:3001');
});






// const express = require('express');

// const mongoose = require('mongoose');
// const socketIo = require("socket.io");
// const http = require("http");
// const webhookRoutes = require('./Routes/postsRoutes');

// const cors = require('cors');

// const app = express();
// app.use(express.json())

// app.use(cors());
// app.use(webhookRoutes);

// // MongoDB Connection

// mongoose.connect('mongodb+srv://ManjunathS1998:ManjunathS1998@webhookscluster.hokpms0.mongodb.net/', {
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on('error', (err) => {
// 	console.error('MongoDB connection error:', err);
// });

// db.once('open', () => {
// 	console.log('Connected to MongoDB');
// });

// // API Routes

// // @ts-ignore
// const PORT = 4001;
// try {

// 	const server = http.createServer(app);
// 	const io = socketIo(server); // < Interesting!
// 	let interval;
// 	console.log("New");

// 	io.on("connection", (socket) => {
// 		console.log("New client connected");
// 		if (interval) {
// 			clearInterval(interval);
// 		}
// 		interval = setInterval(() => getApiAndEmit(socket), 1000);
// 		socket.on("disconnect", () => {
// 			console.log("Client disconnected");
// 			clearInterval(interval);
// 		});
// 	});

// 	const getApiAndEmit = socket => {
// 		const response = new Date();
// 		// Emitting a new message. Will be consumed by the client
// 		console.log("Sent----------------------------------------")
// 		socket.emit("SocketTest", "Working");
// 	};

// 	server.listen(4001, () => console.log(`Listening on port ${4001}`));
// } catch (error) {
// 	console.log('GEneral Error', error);

// }

