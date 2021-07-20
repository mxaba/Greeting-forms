const ConnectPool = require('../config/database');
const greet = require('../greet');

const greetInstaFact = greet();
greetInstaFact.setNamesGreetedOnThePool(ConnectPool);

module.exports = function routesFunctions() {
  async function indexRoute(rq, res) {
    res.render('home', {
      greetings: await greetInstaFact.getCounter(),
    });
  }

  async function greetmeRoute(req, res) {
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
      nameEntered = greetInstaFact.capFirstLetter(nameEntered);
      greetInstaFact.langRun(language, nameEntered);
      await greetInstaFact.addToPool(nameEntered);
    }

    res.render('home', {
      greetPerson: greetInstaFact.greetPerson(),
      greetings: await greetInstaFact.getCounter(),
    });
    nameEntered = '';
    language = null;
  }

  return {
    greetmeRoute,
    indexRoute,
  };
};
