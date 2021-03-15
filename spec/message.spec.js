const assert = require('assert');
const Message = require('../message.js');


describe("Message class", function() {
//Test 4
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });


//Test 5
  it("constructor sets name", function() {
    let test5 = new Message("Banana");
    assert.strictEqual(test5.name, "Banana");
  });

//Test 6
  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let commandsArray = ["Eat your veggies", "Take a walk", "Drink plenty of water!"]
    let test6 = new Message("Apple", commandsArray);
    assert.strictEqual(test6.commands, commandsArray);
  });

});
