var twss = require('twss');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: global.config.nick,
    streams: [
        {
            level:'info',
            stream: process.stdout
        },
        {
            level: 'info',
            path: './'+global.config.nick+'.log'
        }
    ]
});

twss.threshold = 0.999;

var bind = function(client) {
    client.addListener('message', function (from, to, message) {
        if(twss.is(message)){
          client.say(to, "That's what she said!");
        }
        log.info({from: from,
            to: to,
            message: message,
            twssprobability: twss.probability(message)
        });
    });

    client.addListener('error', function(message) {
        log.error( message);
    });

    client.addListener('pm', function(from, message){
        if((global.config.admins.indexOf(from) !== -1) && message == 'shutdown'){
           log.info({from: from, message: 'Shutdown requested'});
           client.disconnect();
        }
    });

};

module.exports.bind = bind;
