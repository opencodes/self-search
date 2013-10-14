var app = (function (app, $) {
	var _app = {
		init: function () {
			app.selfsearch.keys();
			app.selfsearch.init();			
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
			$('#selfsearch-form').on('submit',function(e){
				e.preventDefault();
				query = $('#query-input').val();
				_this = $(this);
				if($('#query-input').val().indexOf('::') == -1 && $('#query-input').val().split('::').length==2){
					return false;
				}else{
					app.selfsearch.post(_this);	
				}
			});
		},
		/**
		 * @function
		 * @description Initializes the selfsearch-content and layout
		 */	
		keys : function () {
			$.get('/search/keys',{keys:1},function(res){
				if(res.status==true){
					app.selfsearch.autocomplete(res.data);
				}else if(res.status==false){
					app.selfsearch.autocomplete([]);
				}
			});
		},
		/**
		 * @function
		 * @description Post Data
		 */
		post : function (_this) {
			
				$.post('/search/post',_this.serialize(),function(res){
					console.log(res);
					if(res.status==true){
						var html = '<div class="bs-callout bs-callout-info">';
							html+= '<h4>'+res.key+'<span class="time">2013-05-24 07:58:40 </span></h4>';
							html+= '<p>'+res.value+'</p>';
							html+= '</div>';
						$('#msg-container').prepend(html);
						app.selfsearch.keys();
					}else if(res.status==false){
						$('#alert-msg').html('<div class="alert alert-danger">'+res.msg+'</div>');
					}
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
