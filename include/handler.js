var twss = require('twss');
twss.threshold = 0.999;

var bind = function(client, config) {
    client.addListener('message', function (from, to, message) {
        if(twss.is(message)){
          client.say(to, 'That\'s what she said!');
        }
        console.log(from + ' => ' + to + ': ' + message);
        console.log('TWSS probablility: '+twss.probability(message));
    });

    client.addListener('error', function(message) {
        console.log('error: ', message);
    });

    client.addListener('pm', function(from, message){
        if((config.admins.indexOf(from) !== -1) && message == 'quit'){
           client.disconnect();
        }
    });

};

module.exports.bind = bind;
