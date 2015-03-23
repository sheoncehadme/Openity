var irc = require('irc');
var twss = require('twss');
var server = 'irc.freenode.net';
var nick = 'twssbot';
twss.threshold = 0.999;

var client = new irc.Client(server, nick, {
    channels: ['#RCFPV','#geekpunks'],
});

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
