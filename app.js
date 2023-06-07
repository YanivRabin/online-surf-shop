const express    = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('mongoose');
const homePage   = require('./routes/testRouts');

mongoose.connect("mongodb+srv://user:password@elmar.jm3jsot.mongodb.net/test", { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use('/', homePage);


app.listen(3000);