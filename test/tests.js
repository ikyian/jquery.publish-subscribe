asyncTest('simple publish subscribe', function(){
	$.subscribe('my.test.event', function(param){
		ok(param == 5);
		start();
	});
	$.publish('my.test.event', [5]);
});

asyncTest('several subscribers', function(){
	var calls_count = 0;
	var handler = function(param1, param2){
		ok(param1 == 'as');
		ok(param2 == 45);
		calls_count += 1;
		if(calls_count == 2){
			start();
		}
	};
	$.subscribe('my.test.event2', handler);
	$.subscribe('my.test.event2', handler);
	$.publish('my.test.event2', ['as', 45]);
});

asyncTest('publish events without subscribers', function(){
	$.subscribe('jquery.publish.error._noHandlers', function(){
		ok(true);
		start();
	});
	$.publish('my.test.event3', ['asdada']);
});

asyncTest('handling error in handler', function(){
	var problematic_handler = function(param){
		throw 'test-error-5';
		ok(false);
	};
	$.subscribe('jquery.publish.error._handlerError', function(error, handler){
		ok(error == 'test-error-5');
		ok(handler == problematic_handler);
		start();
	});
	$.subscribe('my.test.event5', problematic_handler);
	$.publish('my.test.event5', ['asdada']);
});
