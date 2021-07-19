const express = require('express');
const expresshbs = require('express-handlebars');
const bodyParse = require('body-parser');
const expressFlash = require('express-flash');
const expressSession = require('express-session');
const greet = require('./greet');

const app = express();
const greetInsta = greet();
const PORT = process.env.PORT || 5000;

app.use(expressSession({
  secret: "We don't have a secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expresshbs({ defaultLayout: 'main' }));
app.use(expressFlash());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home', {
    greetings: greetInsta.getCounter(),
  });
});

app.post('/greetme', (req, res) => {
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
    greetInsta.nameLists(nameEntered);
  }

  res.render('home', {
    greetPerson: greetInsta.greetPerson(),
    greetings: greetInsta.getCounter(),
  });
  nameEntered = '';
  language = null;
});

app.listen(PORT, () => {
  console.log('App runing on this IP and port: 127.0.0.1:', PORT);
});
