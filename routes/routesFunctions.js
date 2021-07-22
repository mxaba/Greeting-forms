const ConnectPool = require('../config/database');
const greet = require('../greet');

const greetInstaFact = greet();
greetInstaFact.setNamesGreetedOnThePool(ConnectPool);

module.exports = () => {
  async function indexRoute(rq, res) {
    res.render('home', {
      greetings: await greetInstaFact.getCounter(),
    });
  }

  async function greetmeRoute(req, res) {
    let { nameEntered } = req.body;
    let { language } = req.body;

    if (!language && nameEntered === '') {
      setTimeout(() => {
        req.flash('flash', 'Please enter name and select language!');
      }, 300);
    } else if (nameEntered === '') {
      setTimeout(() => {
        req.flash('flash', 'Please enter a name!');
      }, 300);
    } else if (!language) {
      setTimeout(() => {
        req.flash('flash', 'Please select a language!');
      }, 300);
    } else if (!/[a-zA-z]$/.test(nameEntered)) {
      setTimeout(() => {
        req.flash('flash', 'Please pass a valid name!');
      }, 300);
    } else {
      nameEntered = greetInstaFact.capFirstLetter(nameEntered);
      greetInstaFact.langRun(language, nameEntered);
      await greetInstaFact.addToPool(nameEntered, language);
    }

    res.render('home', {
      greetPerson: greetInstaFact.greetPerson(),
      greetings: await greetInstaFact.getCounter(),
    });
    nameEntered = '';
    language = null;
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
  };
};
