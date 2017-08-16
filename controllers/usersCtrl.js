/////////////////////////////////List, Delete//////////////////////////////////////
app.controller('usersCtrl',function($scope,$http,$location,$state, $stateParams,$cookieStore)
{
	

var getAllusers = function(){
  $http.get(baseUrl+'/users').success(
  function(response){
  $scope.users = response.users;
  console.log($scope.users);
  });
    
};
getAllusers();

$scope.get = function(){
          $scope.dataSize= $('.rLength').text();
           console.log($scope.dataSize)
            return $scope.dataSize;       
};
$scope.ser = function(){
        console.log("in src");
         $scope.currentPage = 0 ;     
};

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = '';
    

    //console.log($scope.results.length)
    $scope.numberOfPages=function(){
        var nop =Math.ceil($scope.get()/$scope.pageSize);  
        
        return nop;              
    }



$scope.adduser=function()
{
console.log($scope.user)
// if($scope.user.username == "")
// {
//   alert("please fill name");
// }
	$http.post(baseUrl+'/addUser',$scope.user).success(function(response){


	alert("Saved Successfully");
	
           $state.go("admin.Users");
});
};

});


app.controller('dashboardCtrl',function($scope,$http,$location,$state, $stateParams,$cookieStore)
{
var userscount=function()
{
//console.log("""$scope.count")
  $http.get(baseUrl+'/userscount',$scope.userscount).success(function(response){

  //alert(response.data);
  $scope.userscount = response.data;
  console.log($scope.userscount);
          // $state.go("admin.Users");
});
};
userscount();


var ncount=function()
{
//console.log("""$scope.count")
  $http.get(baseUrl+'/usercountn',$scope.notificationcount).success(function(response){

  //alert(response.data);
  $scope.notificationcount = response.data;
  console.log($scope.notificationcount);
          // $state.go("admin.Users");
});
};
ncount();


var mcount=function()
{
//console.log("""$scope.count")
  $http.get(baseUrl+'/usercountm',$scope.msgcount).success(function(response){

  //alert(response.data);
  $scope.msgcount = response.data;
  console.log($scope.msgcount);
          // $state.go("admin.Users");
});
};
mcount();

});

app.controller('userDelCtrl',function($scope,$http,$location,$state, $stateParams,$cookieStore)
{

// var email=$cookieStore.get('email');

//   if(email==null){
//     $location.path("/login");
//     alert("Please login to access");
//   }
var deleteuser = function(){

     var urlpath= $location.path().split('/');
  var id=urlpath[3];
   //alert(id);

       
    alert('Do you want to delete'+id+ '??');
    
      $http.delete(baseUrl+'/deleteuser/'+id).success(function(response){
        alert("Deleted Successfully");
        getAllusers();

      });
     };   
   deleteuser();  
$state.go("admin.Users");
});

app.controller('userCtrl',function($scope,$http,$location,$state, $stateParams,$cookieStore)
{
console.log("editUser");
var editData=function()
{

     var urlpath= $location.path().split('/');
  var id=urlpath[3];
   //alert(id);

       
      
$http.get(baseUrl+'/user/'+id).success(function(response)
     {
     console.log(response);
   
     $scope.user = {};
     $scope.user=response;
 //alert($scope.user.userName)
     });
    
  
}
editData();

$scope.updateuser=function(){
  console.log("updateing data"+JSON.stringify($scope.user));
  $scope.user.id=$scope.user._id;
$http.post(baseUrl+'/updateUser',$scope.user).success(function(response){
            console.log("response"+response.data);
            alert("Updated Successfully");
            $state.go("admin.Users");
            //window.location.reload();

        });
$state.go("admin.Users");
};


});
