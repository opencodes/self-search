var middleware = {
		/**
		 * Call Open Commerce API
		 */
		callapi : function(url,callback){
			$.ajax({
			     type : "GET",
			     dataType : "jsonp",
			     data : {client_id:app.config.client_id},
			     url : app.config.base_url+url,
			     success: function(data){
			    	 
			           callback({'status':true,items:data});
			     },
			     failure:function(){
			    	   callback({'status':false,items:null});
			     }
			});
		}

};
module.exports = middleware;