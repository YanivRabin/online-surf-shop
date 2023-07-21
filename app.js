const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const socketIO = require('socket.io');
const http = require('http');
const homeRouter = require('./routes/HomeRouter');
const storeRouter = require('./routes/StoreRouter');
const authRouter = require('./routes/AuthRouter');
const cartRouter = require('./routes/CartRouter');
const orderRouter = require('./routes/OrderRoter');




const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 } // Set session expiration to 1 day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    })
);


// Routes
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', homeRouter);
app.use('/auth', authRouter); // for login and register
app.use('/store', storeRouter); // for surfboards and other products
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

io.on('connection', (socket) => {
    socket.broadcast.emit('joined', socket.username + ' Joined');

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', socket.username + ' Disconnected');
    });

    socket.on('new message', (msg) => {
        io.emit('new message', socket.username + ': ' + msg);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// npm run app
// for test: npm run test



