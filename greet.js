module.exports = () => {
  // eslint-disable-next-line no-unused-vars
  let namesGreetedOnThePool;

  function langRun(name, lanFrom) {
    if (lanFrom === 'spanish') {
      return `Hola, ${name}`;
    }
    if (lanFrom === 'isizulu') {
      return `Sawubona, ${name}`;
    }
    if (lanFrom === 'english') {
      return `Hello, ${name}`;
    }
    return false;
  }

  // Converting the first Letter
  function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async function insertIntoDataPool(name, langRunPassed) {
    if (langRunPassed === 'spanish') {
      await namesGreetedOnThePool.query('INSERT INTO greetings(names, english, spanish, isizulu, counts) values($1, $2, $3, $4, $5)', [name, 0, 1, 0, 1]);
    } else if (langRunPassed === 'english') {
      await namesGreetedOnThePool.query('INSERT INTO greetings(names, english, spanish, isizulu, counts) values($1, $2, $3, $4, $5)', [name, 1, 0, 0, 1]);
    } else if (langRunPassed === 'isizulu') {
      await namesGreetedOnThePool.query('INSERT INTO greetings(names, english, spanish, isizulu, counts) values($1, $2, $3, $4, $5)', [name, 0, 0, 1, 1]);
    }
  }

  async function updateDataPool(name, langRunPassed) {
    if (langRunPassed === 'spanish') {
      await namesGreetedOnThePool.query('UPDATE greetings SET spanish=spanish+1, counts=counts+1 WHERE names = $1', [name]);
    } else if (langRunPassed === 'english') {
      await namesGreetedOnThePool.query('UPDATE greetings SET english=english+1, counts=counts+1 WHERE names = $1', [name]);
    } else if (langRunPassed === 'isizulu') {
      await namesGreetedOnThePool.query('UPDATE greetings SET isizulu=isizulu+1, counts=counts+1 WHERE names = $1', [name]);
    }
  }

  // Adding to the object
  async function addToPool(name, lanFrom) {
    const results = await namesGreetedOnThePool.query('SELECT * FROM greetings WHERE names = $1', [name]);

    let message = '';
    if (results.rows.length === 0) {
      insertIntoDataPool(name, lanFrom);
      message = langRun(name, lanFrom);
    } else {
      updateDataPool(name, lanFrom);
      message = langRun(name, lanFrom);
    }
    return message;
  }

  async function getCounter() {
    const greetingsCounter = await namesGreetedOnThePool.query('SELECT COUNT(*) FROM greetings');
    return greetingsCounter.rows[0].count;
  }

  async function getNameList() {
    const nameList = await namesGreetedOnThePool.query('SELECT * FROM greetings ');
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

  async function resetNumber(id) {
    const reseted = await namesGreetedOnThePool.query('DELETE FROM greetings WHERE id = $1', [id]);
    return reseted;
  }

  return {
    resetNames,
    resetNumber,
    setNamesGreetedOnThePool,
    getNAmeOnList,
    langRun,
    addToPool,
    getCounter,
    getNameList,
    capFirstLetter,
  };
};
