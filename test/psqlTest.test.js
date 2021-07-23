/* eslint-disable no-undef */
const assert = require('assert');
const ConnectPool = require('../config/database');
const greet = require('../greet');

const greetInstaFact = greet();
greetInstaFact.setNamesGreetedOnThePool(ConnectPool);

describe('Greetings with database PSQL Tests', () => {
  afterEach(async () => {
    await await greetInstaFact.resetNames();
  });

  // error handling
  describe('Error handling', async () => {
    it('Should return false if the language is not allocated', async () => {
      assert.equal(false, await greetInstaFact.addToPool('Mcebo', 'Tshivivenda'));
    });
    it('Should return false if the language is not passed', async () => {
      assert.equal(false, await greetInstaFact.addToPool('Mcebo', ''));
    });
    it('Should return false if the name is not passed', async () => {
      assert.equal(false, await greetInstaFact.addToPool('', 'Spanish'));
    });
  });

  // laguage and message
  describe('Greeting message', async () => {
    // await greetInstaFact.resetNames();
    it('Should return the name greeted in Spanish', async () => {
      assert.equal('Hola, Mcebo', await greetInstaFact.addToPool('Mcebo', 'spanish'));
    });
    it('Should return the name greeted in English', async () => {
      assert.equal('Hello, Mcebo', await greetInstaFact.addToPool('Mcebo', 'english'));
    });
    it('Should return the name greeted in Spanish', async () => {
      assert.equal('Sawubona, Mcebo', await greetInstaFact.addToPool('Mcebo', 'isizulu'));
    });
  });

  // counter
  describe('Counter Greetings', async () => {
    // await greetInstaFact.resetNames();
    it('Should return the name greeted in Spanish and should return 1 for counter', async () => {
      await greetInstaFact.addToPool('Xaba', 'english');
      await greetInstaFact.addToPool('Xalba', 'english');
      //   assert.equal('Hola, Mcebo', await greetInstaFact.addToPool('Mcebo', 'spanish'));
      assert.equal(1, await greetInstaFact.getCounter());
    });
    it('Should return all the people greeted and the couneter as well', async () => {
      await greetInstaFact.addToPool('Xaba', 'spanish');
      assert.equal('Hello, MCB', await greetInstaFact.addToPool('MCB', 'english'));
      assert.equal('Hola, Mcebo', await greetInstaFact.addToPool('Mcebo', 'spanish'));
      assert.equal('Hola, Xaba', await greetInstaFact.addToPool('Xaba', 'spanish'));
      assert.equal(3, await greetInstaFact.getCounter());
    });
    it('Should greet 5 names and return 5 for the counter as well', async () => {
      await greetInstaFact.addToPool('Xaba', 'english');
      await greetInstaFact.addToPool('Xabaq', 'english');
      await greetInstaFact.addToPool('Mcebo', 'spanish');
      await greetInstaFact.addToPool('MCB', 'isizulu');
      await greetInstaFact.addToPool('Awe', 'english');
      await greetInstaFact.addToPool('OS', 'spanish');
      assert.equal(5, await greetInstaFact.getCounter());
    });
  });

  after(() => {
    ConnectPool.end();
  });
});
