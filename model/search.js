var table = 'search';
var Db = require('./model.js');
var util = require('util');
var Query = require('./sql');


var Search = {
		/**
		 * 
		 * @param data
		 * @param callback
		 */
		 add:function(data,callback){
		      var sql = "";
		      if(data.key && data.value){
		    	  sql = "INSERT INTO `search` (`key`, `value`,`user_id`) ";
		    	  sql+= "VALUES ('"+data.key+"', '"+data.value+"', '"+data.userid+"')";
		      }
		      util.log('Query : '+sql);
		      Db.query(
		          sql,
		          function selectCb(err, result) {
		            if (!err) {
		              return callback(null,result);
		            }
		            else{
		              return callback(err,null);
		            }            
		           }
		       ); 
		    },
		  /**
		   * 
		   * @param id
		   * @param callback
		   */
		  getKeysByUser:function(id,callback){
			  Query.select({user_id:id},table,function(err,result){
				  if(!err){
					  callback(null,result);
				  }else{
					  callback(err,null);
				  }				  
			  });
		  },
		  /**
		   * 
		   * @param id
		   * @param callback
		   */
		  getSearchByKeys:function(data,callback){
			  var sql = "SELECT * FROM `"+table+"` WHERE `user_id` ='"+data.id+"' and `key` LIKE '%"+data.query+"%'";
			  Query.processquery(sql,table,function(err,result){
				  if(!err){
					  callback(null,result);
				  }else{
					  callback(err,null);
				  }		  
			  });
		  },
	      /**
	       * 
	       * @param id
	       * @param callback
	       */
	      deleteById : function(id,callback){
	    	  filters = {'id':id};
	    	  Query.remove(id,table,function(err,result){
	    		  if(!err){
	    			  callback(null,result);
	    		  }else{
	    			  callback(err,null);
	    		  }  		  
	    	  });
	      }
};
module.exports = Search;