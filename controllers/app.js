var app = angular.module('App', ['ui.router','ngCookies','naif.base64','ngStorage']);
var baseUrl="http://104.236.67.117:2000";

		                
/**
* Configure the Routes
*/
		app.config(['$stateProvider', '$urlRouterProvider','$compileProvider',
 					function ($stateProvider, $urlRouterProvider,$compileProvider) {
 						$compileProvider.aHrefSanitizationWhitelist(/^\s*(|http|ftp|mailto|tel|file|blob|data):/);
				console.log("stateProvider");
				$stateProvider
				//Define Common Pages
				.state('login', { 
					 url: '/login'
					 , templateUrl: 'views/loginPage.html'
					 , controller: 'loginCtrl'
				 })
				.state('logout', { 
					 url: '/logout'
					 , templateUrl: 'views/loginPage.html'
					 , controller: 'LogoutCtrl'
				 })
				
				.state('admin', { 
					 url: '/admin'
					 ,templateUrl: 'views/master.html'
					 , abstract: true
				 })
				
				 .state('admin.dashboard', {
                     url: '/dashboard'
                      , templateUrl: 'views/dashboard.html'
                      , controller: 'dashboardCtrl'
                  })
				
				 .state('admin.Users', 
                {
                     url: '/Users'
                      , templateUrl: 'views/users.html'
                      , controller: 'usersCtrl'
                  })

				 .state('admin.User', {
                     url: '/User/:id'
                      , templateUrl: 'views/user.html'
                      , controller: 'userCtrl'
                  })
				   .state('admin.addusers', {
                     url: '/addusers'
                      , templateUrl: 'views/addusers.html'
                      , controller: 'usersCtrl'
                  })
				   
				 .state('admin.EditUser', {
                     url: '/EditUser/:id'
                      , templateUrl: 'views/edituser.html'
                      , controller: 'userCtrl'
                  })

				.state('admin.DeleteUser', {
                     url: '/DeleteUser/:id'
                      , templateUrl: 'views/users.html'
                      , controller: 'userDelCtrl'
                  })
/////////////////////////Notifications
				 .state('admin.Visitors', {
                     url: '/Visitors/:id'
                      , templateUrl: 'views/visitors.html'
                      , controller: 'visitorsCtrl'
                  })


                  .state('admin.Visitor', {
                     url: '/Visitor/:id'  
                      , templateUrl: 'views/visitor.html'
                      , controller: 'visitorCtrl'
                  })
				 // .state('admin.Delete', {
     //                 url: '/Delete'
     //                  , templateUrl: 'views/visitors.html'
     //                  , controller: 'visitorDelCtrl'
     //              })


				
				$urlRouterProvider.otherwise('/login');
		}]);
app.filter('myfilter', function() {
        return function( items, fromDate, toDate ) {
            var filtered = [];
            //here you will have your desired input
            console.log(fromDate, toDate);
            var from_date = Date.parse(fromDate);
            var to_date = Date.parse(toDate);
            angular.forEach(items, function(item) {
            var item_date = Date.parse(item.checkindate);
                if(item_date >= from_date && item_date <= to_date) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    });

app.run(function ($http) {
  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

$http.defaults.headers.post["Content-Type"] = "application/json";
});


