const Message = require('./message.js');
const Command = require('./command.js');


class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts; 
  }
  receiveMessage(message){
    let response = {}
      response.message = message.name
      response.results = []
    let resultObject = {}
    let roverStatus = {}
      for(let i = 0; i < message.commands.length; i++) {
        if(message.commands[i].commandType == 'STATUS_CHECK') {
          roverStatus.mode = this.mode;
          roverStatus.generatorWatts = this.generatorWatts;
          roverStatus.position = this.position;
          resultObject.completed = true;
          resultObject.roverStatus = roverStatus;
          response.results.push(resultObject);
        } 
        else if(message.commands[i].commandType == 'MODE_CHANGE') {
          this.mode = message.commands[i].value;
          resultObject.completed = true;
          response.results.push(resultObject);
          }
          else if(message.commands[i].commandType == 'MOVE') {
            if(this.mode == 'LOW_POWER') {
              resultObject.completed = false
            } else if(this.mode == 'NORMAL'){
              resultObject.completed = true
              this.position = message.commands[i].value;
            }
            response.results.push(resultObject);
          }
      }
      return response;
  } 
}

module.exports = Rover;