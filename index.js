const express = require('express');
const expresshbs = require('express-handlebars');
const bodyParse = require('body-parser');
const expressFlash = require('express-flash');
const expressSession = require('express-session');
// const { Pool } = require('pg');
const pool = require('./database');

const greet = require('./greet');

const app = express();

// Calling logic and passing the pool
const greetInsta = greet();
greetInsta.setNamesGreetedOnThePool(pool);

const PORT = process.env.PORT || 5000;

app.use(expressSession({
  secret: "We don't have a secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expresshbs({ defaultLayout: 'main' }));
// initialising flash middleware
app.use(expressFlash());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

// console.log(pool);

app.get('/', async (req, res) => {
  console.log(greetInsta.getCounter());
  res.render('home', {
    greetings: await greetInsta.getCounter(),
  });
});

app.post('/greetme', async (req, res) => {
  let { nameEntered } = req.body;
  let { language } = req.body;

  if (!language && nameEntered === '') {
    req.flash('flash', 'Please enter name and select language!');
  } else if (nameEntered === '') {
    req.flash('flash', 'Please enter a name!');
  } else if (!language) {
    req.flash('flash', 'Please select a language!');
  } else if (!/[a-zA-z]$/.test(nameEntered)) {
    req.flash('flash', 'Please pass a valid name!');
  } else {
    nameEntered = greetInsta.capFirstLetter(nameEntered);
    greetInsta.langRun(language, nameEntered);
    await greetInsta.addToPool(nameEntered);
  }

  res.render('home', {
    greetPerson: greetInsta.greetPerson(),
    greetings: await greetInsta.getCounter(),
  });
  nameEntered = '';
  language = null;
});

app.listen(PORT, () => {
  console.log('App runing on this IP and port: 127.0.0.1:', PORT);
});
