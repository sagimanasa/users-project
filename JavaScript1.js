angular.module('userApp', [])
  .controller('userCtrl', function($scope, $http) {
    
    $scope.userList = [];
	$scope.domain="http://192.168.56.1:8000/"
	
	$scope.initialization = function(){
		$scope.getUser(); 
		$scope.listenerInit();
	}
	$scope.updateform= function(user){	
		$scope.updateuser={}
		$scope.updateuser.id=user.id; 
		$scope.updateuser.name=user.name;
		$scope.updateuser.age=user.age; 
		$scope.updateuser.gender=user.gender; 		
	}
	$scope.deleteform= function(id){	
		$scope.deleteid=id
	}
	
	$scope.listenerInit = function(){
		var exampleModal = document.getElementById('exampleModal')
		exampleModal.addEventListener('show.bs.modal', function (event) {
		  // Button that triggered the modal
		  var button = event.relatedTarget
		  // Extract info from data-bs-* attributes
		  var recipient = button.getAttribute('data-bs-whatever')
		  // If necessary, you could initiate an AJAX request here
		  // and then do the updating in a callback.
		  //
		  // Update the modal's content.
		  var modalTitle = exampleModal.querySelector('.modal-title')
		  var modalBodyInput = exampleModal.querySelector('.modal-body input')

		  modalTitle.textContent = 'New message to ' + recipient
		  modalBodyInput.value = recipient
		})
	}
	
	$scope.getUser = function() {
      $http({  
            url: $scope.domain + "users",  
            dataType: 'json',  
            method: 'GET',    
            headers: {  
                "Content-Type": "application/json"  
            }  
        }).then(function (response) {   
            $scope.userList = response["data"]["records"]; 		
        },function (error) {  
               console.log(error);  
         });  
    };
	
    $scope.addUser = function(user) {
	  $http.put($scope.domain + "users", JSON.stringify(user), {
		  headers: {  
                "Content-Type": "application/json"  
            }
		}).then(function (response){
			$scope.getUser(); 		
        },function (error) {  
               console.log(error);  
         });  			  
    };
 
    $scope.updateUser = function(user) {
	   $http.post($scope.domain + "users/"+user.id, JSON.stringify(user), {
		  headers: {  
                "Content-Type": "application/json"  
            }
		}).then(function (response){
			$scope.getUser(); 		
        },function (error) {  
               console.log(error);  
         });
    };
 
    $scope.deleteUser = function() {
		url=$scope.domain + "users/"+$scope.deleteid
		
		$http({
		    url:url,
			method: 'DELETE'
	    }).then(function (response){
			$scope.getUser();
		},function (error) {
			      console.log(error);
		 }); 
      
    };
  });