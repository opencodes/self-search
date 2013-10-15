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
		var name = msg[0].trim().charAt(0).toUpperCase() + msg[0].trim().slice(1);
		var value = msg[1].trim();
		console.log("============= post =================");
		searchdb.add({
			key : name,
			value : value,
			userid : 1
		},function(err,res){
			if(!err && res){
				req.jsondata = {status:true,msg:err,key:name,value:value};
				next();
			}else{
				
				req.jsondata = {status:false,msg:err.code};
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
			console.log("============= getKeys =================");
			if(!err && res){
				var keys = [];
				for(var k in res){
					keys.push(res[k].key);
				}
				req.jsondata = {status:true,data:keys};
				next();
			}else{
				req.jsondata = {status:false,data:null};
				next();
			}
		});
	},
	/**
	 * get all data by user
	 * @param req
	 * @param res
	 * @param next
	 */
	getSearchByUser : function(req,res,next){
		searchdb.getKeysByUser(1,function(err,res){
			if(!err && res){
				req.data = {status:true,items:res};
				next();
			}else{
				req.data = {status:false,items:null};
				next();
			}
		});
	},
	/**
	 * get all data by user
	 * @param req
	 * @param res
	 * @param next
	 */
	getSearchByKey : function(req,res,next){
		searchdb.getSearchByKeys({id:1,query:req.query.query},function(err,res){
			if(!err && res){
				req.data = {status:true,items:res};
				next();
			}else{
				req.data = {status:false,items:null};
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
		var data = req.jsondata;
		res.json(data);
	},
	/**
	 * Render Page
	 * @param req
	 * @param res
	 */
	render : function(req,res){
		console.log("============ render ==================");
		console.log(req.data.items);
		res.render('index',{items : req.data.items});
	}	
};
module.exports = selfsearch;