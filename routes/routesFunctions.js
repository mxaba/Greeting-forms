const ConnectPool = require('../config/database');
const greet = require('../greet');

const greetInstaFact = greet();
greetInstaFact.setNamesGreetedOnThePool(ConnectPool);

module.exports = () => {
  async function indexRoute(rq, res) {
    const greetings = await greetInstaFact.getCounter();
    res.render('home', {
      greetings,
    });
  }

  async function homeRoute(rq, res) {
    const greetings = await greetInstaFact.getCounter();
    res.render('home', {
      greetings,
    });
  }

  async function greetmeRoute(req, res, next) {
    try {
      let { nameEntered } = req.body;
      let { language } = req.body;
      let greetings = await greetInstaFact.getCounter();
      let greetPerson;

      if (!language && nameEntered === '') {
        req.flash('info', 'Please enter name and select language!');
      } else if (nameEntered === '') {
        req.flash('info', 'Please enter a name!');
      } else if (!language) {
        req.flash('info', 'Please select a language!');
      } else if (!/[a-zA-z]$/.test(nameEntered)) {
        req.flash('info', 'Please pass a valid name!');
      } else {
        nameEntered = greetInstaFact.capFirstLetter(nameEntered);
        greetPerson = await greetInstaFact.addToPool(nameEntered, language);
        greetings = await greetInstaFact.getCounter();
      }

      res.render('home', {
        greetPerson,
        greetings,
      });

      nameEntered = '';
      language = null;
    } catch (error) {
      next(error);
    }
  }

  async function greetedRoute(req, res) {
    console.log(await greetInstaFact.getNameList());
    res.render('greeted', {
      greeting: await greetInstaFact.getNameList(),
    });
  }

  async function greetedNameRoute(req, res) {
    const name = req.params.firstName;
    console.log(name);
    const namePassed = await greetInstaFact.getNAmeOnList(name);
    res.render('greetedname', {
      name,
      id: namePassed[0].id,
      counts: namePassed[0].counts,
      english: namePassed[0].english,
      spanish: namePassed[0].spanish,
      isizulu: namePassed[0].isizulu,
    });
  }

  async function resetRoute(req, res) {
    req.flash('info', 'Database Cleared!');
    res.render('greeted', {
      reset: await greetInstaFact.resetNames(),
    });
  }

  async function resetNumberRoute(req, res) {
    const { id } = req.params;

    res.render('greeted', {
      reseted: await greetInstaFact.resetNumber(id),
      greeting: await greetInstaFact.getNameList(),
    });
  }

  async function resetHomeRoute(req, res) {
    req.flash('info', 'Database Cleared!');
    res.render('home', {
      reset: await greetInstaFact.resetNames(),
      greetings: await greetInstaFact.getCounter(),
    });
  }

  return {
    resetHomeRoute,
    resetNumberRoute,
    greetedRoute,
    greetedNameRoute,
    resetRoute,
    greetmeRoute,
    indexRoute,
    homeRoute,
  };
};
