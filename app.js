const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./api/routes/commonRoutes')
const bodyParser = require('body-parser');

const URL = process.env.DB_URL;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));


app.use("/", routes);

app.listen(process.env.PORT, (err) =>{
    if(err){
        console.log('err during server start', err);
    }
    console.log('server started success');
    mongoose.connect(URL,{useNewUrlParser: true}, (err)=>{
        if(!err){ console.log("DB connection successfully created!!!") }
        else{ console.log('error during db connect ', err)}
    });

})