const assert = require('assert');
const Command = require('../command.js');

//Test 1
describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

//Test 2
  it("constructor sets command type", function() {
    let test2 = new Command("Bingo");
    assert.strictEqual(test2.commandType, "Bingo");
  });

//Test 3
  it("constructor sets a value passed in as the 2nd argument", function() {
    let test3 = new Command("Bingo", "Cosmo");
    assert.strictEqual(test3.value, "Cosmo");
  });

});



