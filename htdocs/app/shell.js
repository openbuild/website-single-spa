define(['plugins/router', 'durandal/app'], function (router, app){

    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
            	{ route: '404.obd', title:'Page not found', moduleId: 'error/not-found', nav: false },
                { route: ['', 'index.obd'], title:'Welcome', moduleId: 'welcome/welcome', nav: true },
                { route: 'flickr.obd', title:'Flickr', moduleId: 'flickr/flickr', nav: true },
                { route: 'products-and-services.obd', title:'Products &amp; Services', moduleId: 'services/index', nav: true },
                { route: 'contact-us.obd', title:'Contact Us', moduleId: 'contact/index', nav: true },
				{ route: 'terms(-:page).obd', moduleId: 'terms/index', nav: false},

            ])
            .buildNavigationModel()
            .mapUnknownRoutes('error/not-found', 'not-found')
            .activate({ pushState : true });
            
        },
        /*
        attached: function() {
        
        },
        compositionComplete: function () {
        
        }
        */
    };
    
});