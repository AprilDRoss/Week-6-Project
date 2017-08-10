const fs = require('fs');
const path = require('path');
const express = require('express');
const models = require('./models');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes/index");
const home = require("./routes/home.js");
const signup = require("./routes/signup");
const login = require("./routes/login");
const gabble = require("./routes/gabble");
const logout = require("./routes/logout");
var session = require('express-session');


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(session({
  secret:'hydration',
  resave:false,
  saveUninitialized:false
}));

app.use(routes);
app.use('/home', home);
app.use('/signup', signup);
app.use('/login', login);
app.use('/gabble', gabble);
app.use('/logout', logout);


app.listen(3000, function(){
console.log('App running on localhost: 3000');
});
