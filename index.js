const express = require('express');
const expresshbs = require('express-handlebars');
const bodyParse = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expresshbs({ defaultLayout: 'main' }));

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log('App runing on this IP and port: 127.0.0.1:', PORT);
});
