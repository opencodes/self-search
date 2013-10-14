var table = 'search';
var Db = require('./model.js');
var util = require('util');
var Query = require('./sql');


var Search = {
    add:function(data,callback){
      var sql = "";
      if(data.key && data.value){
    	  sql = "INSERT INTO `search` (`key`, `value`,`user_id`) ";
    	  sql+= "VALUES ('"+data.key+"', '"+data.value+"', '"+data.userid+"')";
      }
      util.log('Query : '+sql);
      Db.query(
          sql,
          function selectCb(err, results) {
            if (!err) {
              return callback(null,result);
            }
            else{
              return callback(err,null); 
            }            
           }
       ); 
      },
      getKeysByUser:function(id,callback){
    	  Query.select({user_id:id},table,function(err,result){
    		  if(!err){
    			  callback(null,result);
    		  }else{
    			  callback(err,null);
    		  }
    		  
    	  });
      },
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



