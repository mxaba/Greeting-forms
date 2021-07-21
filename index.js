const express = require('express');
const expresshbs = require('express-handlebars');
const bodyParse = require('body-parser');
const expressFlash = require('express-flash');
const expressSession = require('express-session');
const RoutesFunctions = require('./routes/routesFunctions');

const app = express();

// Calling logic and passing the pool
const routesFunctionsNames = RoutesFunctions();

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

app.get('/', routesFunctionsNames.indexRoute);
app.get('/greeted', routesFunctionsNames.greetedRoute);
app.get('/counter/:firstName', routesFunctionsNames.greetedNameRoute);

app.post('/greetme', routesFunctionsNames.greetmeRoute);
app.post('/reset', routesFunctionsNames.resetRoute);

app.listen(PORT, () => {
  console.log('App runing on this IP and port: 127.0.0.1:', PORT);
});
