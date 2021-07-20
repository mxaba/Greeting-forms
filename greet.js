module.exports = () => {
  let languMessage = '';
  let person = '';
  const nameList = {};
  // eslint-disable-next-line no-unused-vars
  let namesGreetedOnThePool;

  function langRun(la, per) {
    if (la === 'spanish') {
      languMessage = 'Hola, ';
    } if (la === 'isizulu') {
      languMessage = 'Sawubona, ';
    } if (la === 'english') {
      languMessage = 'Hello, ';
    }
    person = per;
    // return languMessage + person
  }

  function checkErrors() {
    if (person === '') {
      return 'Please pass a name';
    } if (languMessage === '' || languMessage === undefined) {
      return 'Please Select a Language';
    }
    return '';
  }

  // Converting the first Letter
  function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Adding to the object
  async function addToPool(name) {
    const results = await namesGreetedOnThePool.query('SELECT * FROM greetings WHERE names = $1', [name]);

    if (results.rows.length === 0) {
      if (name !== '') {
        await namesGreetedOnThePool.query('INSERT INTO greetings(names, counts) values($1, $2)', [name, 1]);
      } else {
        await namesGreetedOnThePool.query('UPDATE greetings SET counts=counts+1 WHERE names=$1', [name]);
      }
    }
  }

  function greetPerson() {
    return languMessage + person;
  }

  async function getCounter() {
    const greetingsCounter = await namesGreetedOnThePool.query('SELECT COUNT(*) FROM greetings');
    return greetingsCounter.rows[0].count;
  }

  function getNameList() {
    return nameList;
  }

  function setNamesGreetedOnThePool(names) {
    namesGreetedOnThePool = names;
  }

  function getNAmeOnList(name) {
    if (nameList[name] !== undefined) {
      return false;
    }
    return true;
  }

  return {
    setNamesGreetedOnThePool,
    getNAmeOnList,
    greetPerson,
    langRun,
    checkErrors,
    addToPool,
    getCounter,
    getNameList,
    capFirstLetter,
  };
};
