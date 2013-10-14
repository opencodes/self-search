"use strict";
var util = require('util');
var config = require('../config');
var selfsearch = require('./selfsearch');
module.exports = function(app){
	app.get('/', selfsearch.getSearchByUser, selfsearch.render);
	app.post('/search/post', selfsearch.authenticate, selfsearch.post, selfsearch.json);
	app.get('/search/keys', selfsearch.getKeys,selfsearch.json);
};
