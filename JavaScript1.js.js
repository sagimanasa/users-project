var TestCtrl = function ($scope, $http) {  
    $scope.firstCall = function () {  
  
        $http({  
            url: "NewRoute/getDataForAngularGrid",  
            dataType: 'json',  
            method: 'GET',  
            data: '',  
            headers: {  
                "Content-Type": "application/json"  
            }  
        }).success(function (response) {  
            debugger;  
            $scope.CustomerList = response;  
        })  
           .error(function (error) {  
               alert(error);  
           });  
    }  
} 