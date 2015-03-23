#!/usr/bin/nodejs

var irc = require('irc');
global.config = require('./config');
var handler = require('./include/handler.js');

var client = new irc.Client(global.config.server, global.config.nick, global.config.options);
handler.bind(client);
