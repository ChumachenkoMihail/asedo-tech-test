const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const router = require('./router');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(urlencodedParser);
app.use(router);
app.engine('hbs', exphbs(
    {
        layoutsDir: "src/views/layouts",
        defaultLayout: 'layout',
        extname: 'hbs'
    }
));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

let data = new Date();
let hh = String(data.getHours());
let mm = String(data.getMinutes());
if(data.getHours()<10)
    hh = '0' + hh;
if(data.getMinutes()<10)
    mm = '0' + mm;
let START_MESSAGE = `Server is running at ${config.WEB_SERVER_PORT} port. TIME: ${hh}:${mm}`;

mongoose.connect(config.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(()=>{
        console.log('MongoDB successfully connected!');
        app.listen(config.WEB_SERVER_PORT, err => {
            if(err) {
                console.log('Server start error!');
                console.log(err);
            }
            else
                console.log(START_MESSAGE);
        })
    })
.catch(console.log);
