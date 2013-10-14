var app = (function (app, $) {
	var _app = {
		init: function () {
			app.selfsearch.keys(function(res){
				if(res){
					app.selfsearch.autocomplete(res);
				}
			});
			app.selfsearch.post();
			
		}
	};	
	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));
/**
@class app.selfsearch
*/
(function (app, $) {
	app.selfsearch = {
		/**
		 * @function
		 * @description Initializes the selfsearch-content and layout
		 */	
		init : function () {
			
		},
		/**
		 * @function
		 * @description Initializes the selfsearch-content and layout
		 */	
		keys : function (callback) {
			$.get('/search/keys',{keys:1},function(res){
				if(res.status==true){
					callback(res.data);
				}else if(res.status==false){
					callback([]);
				}
			});
		},
		/**
		 * @function
		 * @description Post Data
		 */
		post : function () {
			$('#selfsearch-form').on('submit',function(e){
				e.preventDefault();
				$.post('/search/post',$(this).serialize(),function(res){
					console.log(res);
					if(res.status==true){
						var html = '<div class="bs-callout bs-callout-info">';
							html+= '<h4>'+res.key+'<span class="time">2013-05-24 07:58:40 </span></h4>';
							html+= '<p>'+res.value+'</p>';
							html+= '</div>';
						$('#msg-container').prepend(html);
					}else if(res.status==false){
						$('#alert-msg').html('<div class="alert alert-danger">'+res.msg+'</div>');
					}
				});
			});
		},
		autocomplete : function(keys){
			    $( "#query-input" ).autocomplete({
			      source: keys
			    });
		}
		
	};

}(window.app = window.app || {}, jQuery));
//initialize app
jQuery(document).ready(function () {
	app.init();
});
