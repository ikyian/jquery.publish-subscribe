(function($){
	var _handlersRegistry = {};
	var _eventsQueue = [];
	
	var _fireEvent = function(){
		var event = _eventsQueue.shift();
		if(event){
			var handlers = _handlersRegistry[event.name];
			if(handlers){
				$.each(handlers, function(idx, handler){
					try{
						handler.apply(self, event.params);
					}catch(err){
						publish('jquery.publish.error._handlerException', [err]);
						/*skip failed handlers*/
						console.log(err);
					}
				});
			}else{
				publish('jquery.publish.error._noHandlers', []);
			}
		}
	};
	
	var publish = function(eventName, paramsArray){
		_eventsQueue.push({
			name : eventName,
			params : paramsArray
		});
		setTimeout(_fireEvent, 0);
	};
	
	var subscribe = function(eventName, handler){
		var handlers = _handlersRegistry[eventName];
		if(typeof(handlers) == 'undefined'){
			handlers = [];
			_handlersRegistry[eventName] = handlers;
		}
		handlers.push(handler);
	};
	
	$.publish = publish;
	$.subscribe = subscribe;
})(jQuery);