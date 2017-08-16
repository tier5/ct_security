app.controller('loginCtrl',function($scope,$http,$location, $cookieStore,$state)
{
	console.log("loginCtrl");
	
	
	$scope.loginData=function(){
		
 
	 	$http.post(baseUrl+'/adminLogin',$scope.text).success(function(response){
           console.log("admin");
    console.log("admin" + JSON.stringify(response));    
    console.log("admin" + JSON.stringify(response.user.email));
   if(response.status == "success" )
    {
	console.log("admin");
    console.log("admin" + JSON.stringify(response));
    $cookieStore.put('email', response.user.email); 
    console.log($cookieStore.get('email'));
  	$cookieStore.put('password', response.user.password); 
     	$state.go("admin.dashboard"); 
   }
   if(response.status != "success" )    { 
     
     $scope.message1="Incorrect EmailID";
     $scope.message2="Incorrect Password";
     $scope.message3="Incorrect EmailID or Password";
     alert($scope.message3);
     }
  })
   .error(function(err){
 
  // if(response.status != "success" )    { 
  	 
     $scope.message1="Incorrect EmailID";
     $scope.message2="Incorrect Password";
     $scope.message3="Incorrect EmailID or Password";
     alert($scope.message3);
     // }

  
 });

};

});