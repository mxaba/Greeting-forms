module.exports = () => {
  let languMessage = '';
  let person = '';
  const nameList = {};
  let greetingsCounter = 0;

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
  function nameLists(name) {
    // nameList = name;
    if (nameList[name] === undefined) {
      greetingsCounter += 1;
      nameList[name] = 1;
      return nameList;
    }
    nameList[name] += 1;
    return nameList;
  }

  function greetPerson() {
    return languMessage + person;
  }

  function getCounter() {
    return greetingsCounter;
  }

  function getNameList() {
    return nameList;
  }

  function getNAmeOnList(name) {
    if (nameList[name] !== undefined) {
      return false;
    }
    return true;
  }

  return {
    getNAmeOnList,
    greetPerson,
    langRun,
    checkErrors,
    nameLists,
    getCounter,
    getNameList,
    capFirstLetter,
  };
};
