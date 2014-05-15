define(['plugins/router', 'durandal/events', 'jquery'], function(router, events, jquery){

	var ctor = {};

	events.includeIn(ctor);

	ctor.page = null;

	ctor.getView = function(){
		return '/app/terms/' + ctor.page;
	};

	ctor.activate = function(page){
	
		var pages = ['index', 'cookies'];
	
		if(page == null){
			page = 'index';
		}
		
		if(jquery.inArray(page, pages) == -1){		
			router.navigate('404.obd');
			return;
		}
		
		ctor.page = page;
		
	};

    return ctor;
    
});