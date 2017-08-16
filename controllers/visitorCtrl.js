/////////////////////////////////List, Delete//////////////////////////////////////
app.controller('visitorCtrl',function($scope,$http,$location,$state, $stateParams,$cookieStore)
{
  
  var urlpath= $location.path().split('/');
  var id=urlpath[3];
    //alert(id);
  var getvisitor = function(){
    $http.get(baseUrl+'/visitordata/'+id).success(
    function(response){
      $scope.visitor = {};
    $scope.visitor = response.data;
    console.log(response);
    });
      
  };
  getvisitor();

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


});



app.controller('visitorsCtrl',function($scope,$http,$location,$state, $stateParams,$cookieStore)
{
  $scope.dateFrom=new Date(2017,07,01);
  $scope.dateTo=new Date();
  //console.log("editUser");

  var urlpath= $location.path().split('/');
  var id=urlpath[3];
  
  $scope.editData = function() {
    $http.get(baseUrl+'/findvisitor/'+id).success(function(response) {
      // console.log(response);
   
     $scope.visitor = {};
     $scope.visitors=response.data;
     console.log($scope.visitors);
    });
  }

  $scope.getall = function(){
    $http.get(baseUrl+'/allvisitor').success(function(response){
      $scope.visitors = {};
      $scope.visitors = response.data;
      console.log(response);
    });
      
  };

  // if user id present in url then get visitors related to that user id
  // else get all visitors
  if(id) {
    $scope.editData();
  } else {
    $scope.getall();
  }


  $scope.find = function(item){
    
    return  item.location == '' &&  item.checkindate == '' ;// item.location == $scope.r && item.checkindate == $scope.s ||

  };

// $scope.updateuser=function(){
//   console.log("updateing data"+JSON.stringify($scope.user));
//   $scope.user.id=$scope.user._id;
// $http.post(baseUrl+'/updateUser',$scope.user).success(function(response){
//             console.log("response"+response.data);
//             alert("Updated Successfully");
//             $state.go("admin.Users");
//             //window.location.reload();

//         });
// $state.go("admin.Users");
// };


});
