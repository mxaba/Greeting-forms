const express = require('express');
const expresshbs = require('express-handlebars');
const bodyParse = require('body-parser');
const expressFlash = require('express-flash');
const greet = require('./greet');

const app = express();
const greetInsta = greet();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expresshbs({ defaultLayout: 'main' }));
app.use(expressFlash());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/greetme', (req, res) => {
  let { nameEntered } = req.body;
  const { language } = req.body;

  if (!language && nameEntered === '') {
    req.flash('info', 'Please enter name and select language!');
  } if (nameEntered === '') {
    console.log('Please enter a name!');
  } if (!language) {
    console.log('Please select a language!');
  } if (!/[a-zA-z]$/.test(nameEntered)) {
    console.log('Please pass a valid name!');
  } else {
    nameEntered = greetInsta.capFirstLetter(nameEntered);
    greetInsta.langRun(language, nameEntered);
    greetInsta.nameLists(nameEntered);
  }

  res.render('home', {
    greetPerson: greetInsta.greetPerson(),
    greetings: greetInsta.getCounter(),
  });
});

app.listen(PORT, () => {
  console.log('App runing on this IP and port: 127.0.0.1:', PORT);
});
