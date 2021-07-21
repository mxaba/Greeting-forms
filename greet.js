module.exports = () => {
  let languMessage = '';
  let person = '';
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
      await namesGreetedOnThePool.query('INSERT INTO greetings(names, counts) values($1, $2)', [name, 1]);
    } else {
      await namesGreetedOnThePool.query('UPDATE greetings SET counts=counts+1 WHERE names = $1', [name]);
    }
  }

  function greetPerson() {
    return languMessage + person;
  }

  async function getCounter() {
    const greetingsCounter = await namesGreetedOnThePool.query('SELECT COUNT(*) FROM greetings');
    return greetingsCounter.rows[0].count;
  }

  async function getNameList() {
    const nameList = await namesGreetedOnThePool.query('SELECT * FROM greeting');
    return nameList.rows;
  }

  function setNamesGreetedOnThePool(names) {
    namesGreetedOnThePool = names;
  }

  async function getNAmeOnList(name) {
    const greetedName = await namesGreetedOnThePool.query('SELECT * FROM greetings WHERE names =$1', [name]);
    return greetedName.rows;
  }

  async function resetNames() {
    const reseted = await namesGreetedOnThePool.query('DELETE FROM greetings');
    return reseted;
  }

  return {
    resetNames,
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
