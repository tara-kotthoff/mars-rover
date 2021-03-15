const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');



describe("Rover Tests", function() {
// Test 7
  it("constructor sets position and default values for mode and generatorWatt", function() {
    let test7 = new Rover(555555);
    assert.strictEqual(test7.position, 555555);
    assert.strictEqual(test7.mode, 'NORMAL');
    assert.strictEqual(test7.generatorWatts, 110)
  });
  

// Test 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE')]
    let testMessage = new Message('Chimichanga', commands)
    let test8 = new Rover(444444);
    let test8Response = test8.receiveMessage(testMessage);
    assert.strictEqual(test8Response.message, 'Chimichanga')
  });


// Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE'), new Command('STATUS_CHECK')];
    let message = new Message("Test 9 Message", commands);
    let rover = new Rover(9);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
  });

// Test 10
  it("responds correctly to status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('I need chocolate.', commands);
    let rover = new Rover(10);    
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].roverStatus.mode, 'NORMAL');
    assert.strictEqual(response.results[0].roverStatus.position, 10);
    assert.strictEqual(response.results[0].roverStatus.generatorWatts, 110);
  });

// Test 11
  it("responds correctly to normal mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Change power mode', commands);
    let rover = new Rover(11);    
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.mode, 'NORMAL');
    assert.strictEqual(response.results[0].completed, true)
  });


// Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MOVE', 20)];
    let message = new Message('Move rover', commands);
    let rover = new Rover(12, 'LOW_POWER');    
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.mode, 'LOW_POWER');
    assert.strictEqual(response.results[0].completed, false)
    assert.strictEqual(rover.position, 12)
  });


// Test 13
it("responds with position for move command", function(){
    let commands = [new Command('MOVE', 20)];
    let message = new Message('Move rover', commands);
    let rover = new Rover(13);    
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.position, 20);
  });
});


