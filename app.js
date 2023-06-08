const express             = require('express');
const bodyParser          = require('body-parser');
const {mongoose}          = require('mongoose');
const cors                = require('cors')
const homeRouter          = require('./routes/HomeRouter');
const surfboardsRouter    = require('./routes/SurfboardsRouter');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/surfboards', surfboardsRouter);


app.listen(3000);
//npm run dev