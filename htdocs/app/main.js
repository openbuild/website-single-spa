requirejs.config({
    paths: {
        'text': '/lib/requirejs-text/text',
        'durandal':'/lib/durandal/js',
        'plugins' : '/lib/durandal/js/plugins',
        'transitions' : '/lib/durandal/js/transitions',
        'knockout': '/lib/knockout.js/knockout',
        'bootstrap': '/lib/bootstrap/dist/js/bootstrap.min',
        'jquery': '/lib/jquery/jquery',
		'openbuild': '/lib/openbuild-js-core',
		'toastr': '/lib/toastr/toastr.min',
		'QUnit': '/lib/qunit/qunit-1.13.0',
		'moment': '/lib/moment/moment.min',
		'ws': '/lib/web-socket-js'
    },
    shim: {
    	'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       },
       'QUnit': {
			exports: 'QUnit',
			init: function() {
				QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		}
    },
    map: {
		'*': {
			'ko': 'knockout',
		}
	}
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router', 'openbuild/dataservice', 'bootstrap', 'jquery', 'ko'],  function (system, app, viewLocator, router, dataservice, bootstrap, jquery, ko) {

    system.debug(true);

    app.title = 'OpenBuild';

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true,
        //observable: true
    });
	
	app.on('growl').then(function(data){
			
		require(['toastr'], function(toastr){
		
			toastr.options.closeButton = true;
			toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
			toastr.options.timeOut = null;
			toastr.success(data.message, 'Message:');
		
		});
			
	});

	app.start().then(function(){

		viewLocator.useConvention();

		router.handleInvalidRoute = function(route, params){

			require(['toastr'], function(toastr){
		
				toastr.options.closeButton = true;
				toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
				toastr.options.timeOut = null;
				toastr.error('Not route found: ' + route, 'Message:');
		
			});

		};

		app.setRoot('shell', 'entrance');
		app.showMessage("OpenBuild (Sheffield) LTD uses cookies. Some may have been set already. <a href='/terms-cookies.obd'>Read about managing our cookies.</a> If you continue to use the site, we'll assume you're happy to accept.", "OpenBuild - Cookie message");
		
	}).fail(function(error){

		require(['toastr'], function(toastr){
		
			toastr.options.closeButton = true;
			toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
			toastr.options.timeOut = null;
			toastr.error('Failed to start app: ' + error, 'Message:');
		
		});

	});
	
	ko.bindingHandlers.closeBootstrapNavigationMenuOnClick = {

		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			// This will be called when the binding is first applied to an element
			// Set up any initial state, event handlers, etc. here
			jquery(element).on('click', 'a.navbar-link', null, function(){
				var navbarToggle = $('.navbar-toggle');
				if (navbarToggle.is(':visible')) {
					navbarToggle.trigger('click');
				}
			});
			
		}
	};
		
});