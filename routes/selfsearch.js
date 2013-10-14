"use strict";
/**
 * @class selfsearch
 */
var util = require('util');
var searchdb = require('../model/search');
var selfsearch = {
	/**
	 * Authenticate User
	 * @param req
	 * @param res
	 * @param next
	 */
	authenticate : function(req,res,next){
		next();
	},
	/**
	 * Post Data
	 * @param req
	 * @param res
	 * @param next
	 */
	post : function(req,res,next){
		var msg = req.body.query.split('::');
		var name = msg[0].trim().charAt(0).toUpperCase() + msg[0].trim().slice(1);;
		var value = msg[1].trim();
		searchdb.add({
			key : name,
			value : value,
			userid : 1
		},function(res,err){
			if(!err && res){
				req.data = {status:true,msg:err,key:name,value:value};
				next();
			}else{
				
				req.data = {status:false,msg:err.code};
				next();
			}
		});
		
	},
	/**
	 * get keys
	 * @param req
	 * @param res
	 * @param next
	 */
	getKeys : function(req,res,next){
		searchdb.getKeysByUser(1,function(err,res){
			console.log(err);
			if(!err && res){
				var keys = [];
				for(var k in res){
					keys.push(res[k].key);
				}
				req.data = {status:true,data:keys};
				next();
			}else{
				req.data = {status:false,data:null};
				next();
			}
		});
	},
	/**
	 * Send Json Response
	 * @param req
	 * @param res
	 * @param next
	 */
	json : function(req,res,next){
		var data = req.data;
		res.json(data);
	},
	/**
	 * Render Page
	 * @param req
	 * @param res
	 */
	render : function(req,res){
		res.render('index');
	}	
};
module.exports = selfsearch;