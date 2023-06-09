const express             = require('express');
const bodyParser          = require('body-parser');
const {mongoose}          = require('mongoose');
const homeRouter          = require('./routes/HomeRouter');
const surfboardsRouter    = require('./routes/SurfboardsRouter');


const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use('/', homeRouter);
app.use('/surfboards', surfboardsRouter);

app.listen(3000);
//npm run app