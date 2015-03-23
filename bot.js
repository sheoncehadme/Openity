#!/usr/bin/nodejs

var irc = require('irc');
var config = require('./config');
var handler = require('./include/handler.js');

var client = new irc.Client(config.server, config.nick, config.options);
handler.bind(client, config);
