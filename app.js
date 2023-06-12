const express               = require('express');
const bodyParser            = require('body-parser');
const { mongoose }          = require('mongoose');
const path                  = require("path");
const session               = require("express-session");
const homeRouter            = require('./routes/HomeRouter');
const surfboardsRouter      = require('./routes/SurfboardsRouter');
const authRouter            = require('./routes/authRouter')

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("useCreateIndex", true);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json());
app.use(session({

    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));


// Routes
app.use('/', homeRouter);
app.use('/auth', authRouter); // for login and register
// app.use('/store', productsRouter); // for surfboards and other products
app.use('/surfboards', surfboardsRouter);

app.listen(3000, () => { console.log('Server is running on http://localhost:3000'); });
// npm run app
// for test: npm run test