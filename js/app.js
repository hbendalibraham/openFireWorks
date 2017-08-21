/**
* Created by hbendali on 22/07/17.
*/
var myApp = angular

.module('myApp', ['ngRoute'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider

    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .when('/chantier', {
      templateUrl: 'templates/chantier.html',
      controller: 'ChantierController'
    })
    .when('/automobile', {
      templateUrl: 'templates/automobile.html',
      controller: 'AutomobileController'
    })
    .when('/utilites', {
      templateUrl: 'templates/utilites.html',
      controller: 'UtilitesController'
    })
    .when('/user_list', {
      templateUrl: 'templates/user_list.html',
      controller: 'UserListController'
    })
    .when('/profile/:id', {
      templateUrl: 'templates/profile.html',
      controller: 'ProfileController'
    })

    .when('/contacts_list', {
      templateUrl: 'templates/contacts_list.html',
      controller: 'ContactsListController'
    })
    .when('/contact/:id', {
      templateUrl: 'templates/contact.html',
      controller: 'ContactController'
    })

    .when('/settings', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController'
    })

    .when('/about', {
      templateUrl: 'templates/about.html'
    })
    .when('/logout', {
      templateUrl: 'templates/about.html'
    })
    .when('/err404', {
      templateUrl: 'templates/err404.html'
    })

    .otherwise('main')
    ;

  }
])

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
})

// ==================================================================================================
.controller('IndexController', function ($scope, $http) {
  if (!$scope.$parent.user)
    $http.get('./api/?user')
      .then(function(res){
        $scope.$parent.user = res.data;
        console.log($scope.$parent.user);
        //if ()
        //var policy = jQuery.parseJSON($scope.$parent.user.policy);
        var policy = jQuery.parseJSON('{}');
        $scope.$parent.user.policy = policy;

        console.log("-> Load user");
        console.log($scope.$parent.user);
      })
    ;
})

// ==================================================================================================
.controller('MainMenuBar', function ($scope) {

})

// ==================================================================================================
.controller('MainController', function ($scope, $http) {

})

// ==================================================================================================
.controller('ContactsListController', function ($scope,$http) {
  if (!$scope.$parent.contacts_list)
    $http.get('./api/?contact=a')
      .then(function(res){
        $scope.$parent.contacts_list = res.data;
        console.log("-> ContactsList");
        console.log($scope.$parent.contacts_list);
      })
    ;
})

// ==================================================================================================
.controller('ContactController', function ($scope,$http,$routeParams,$location) {
  $scope.spiner_save = false;
  $scope.spiner_del  = false;
  $scope.contact = {'id':null,'name':null,'more_contact':[],'address':null,'type':null,'credit':0,'note':null};
  $scope.contact.id = $routeParams.id;
  console.log($scope.contact.id);

  $('.ui.dropdown')
    .dropdown()
  ;

  
  if ($scope.contact.id != "0"){
    $http.get('api/?contact='+$scope.contact.id)
      .then(function(res){
        res.data[0].more_contact = angular.fromJson(res.data[0].more_contact);
        res.data[0].credit = Number (res.data[0].credit) ;
        $scope.contact = res.data[0];
        console.log("-> Contact "+$scope.contact.id);
        console.log($scope.contact);
      });
  }



  $scope.add_number = function(){
    //$scope.contact.more_contact.push({'name':null, 'tel':null, 'fax':null, 'mobile':null, 'email':null});
    $scope.contact.more_contact.push({'name':null, 'tel':null, 'fax':null, 'mobile':null, 'email':null});
    console.log($scope.contact);
  }

  $scope.save = function(){
    if ( $('.ui.form').form('is valid') ){
      $scope.spiner_save = true;

      $scope.contact.more_contact = angular.toJson($scope.contact.more_contact);
      $scope.contact.type = $('#type_contact').val();

      console.log("save");
      console.log($scope.contact);

      $http.post('./api/?contact=s', $scope.contact, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        console.log(r);

        if (r.data.id != "0")
          $scope.contact.id = r.data.id;

        if (r.data.error[1] == null)
          $scope.msg = "contact enregistrer";
        else
          $scope.msg = r.data.error[2];
        
        console.log("-> done!");
        $scope.spiner_save = false;
        delete $scope.$parent.contacts_list;
        $location.path('contacts_list');
      },      
      function(){
        $scope.msg = "Erreur d'enregistrement";
        console.log("-> field");
        $scope.spiner_save = false;
      });
    }
  }

  $scope.delete = function(){
    $scope.spiner_del = true;
    if ($scope.contact.id != "0" && $scope.contact.id != "" && confirm("Etre vous sure de vouloir supprimer ce contact ?")){
      
      $http.post('./api/?contact=d&id='+$scope.contact.id)
      .then(function (r) {
        console.log(r);
        if (!r.data.error){
          console.log("-> delete field");
          $location.path('contacts_list');          
        }else if (r.data.error[1] != null){
          console.log("-> delete field");
        }else{
          delete $scope.$parent.contacts_list;
          console.log("-> delete done!");
          $location.path('contacts_list');
        }
      },      
      function(){
        console.log("-> delete field");
      });
      $scope.spiner_del = false;
    }else{
      $scope.spiner_del = false;
    }
  }

})

// ==================================================================================================
.controller('ChantierController', function ($scope) {

})

// ==================================================================================================
.controller('AutomobileController', function ($scope) {

})

// ==================================================================================================
.controller('UtilitesController', function ($scope) {

})

// ==================================================================================================
.controller('SettingsController', function ($scope) {

})




// ==================================================================================================
.controller('ProfileController', function ($scope,$http,$routeParams,$location) {
  $scope.spiner_save = false;
  $scope.spiner_del  = false;
  $scope.profile = {'id':null,'username':null,'password':null,'firstname':null,'lastname':null,'email':null,'department':null,'dir':null,'mobile':null,'tel':null,'fax':null,'address':null,'lat':null,'long':null,'signature':null,'policy':null};

  $('.message .close')
    .on('click', function() {
      $(this)
        .closest('.message')
        .transition('fade')
      ;
    })
  ;

  if ($routeParams.id != "0"){
    $http.get('api/?user='+$routeParams.id)
      .then(function(res){
        $scope.profile = res.data[0];
        $("#terms").html('');
        console.log("-> Profile "+$routeParams.id);
        console.log($scope.profile);
      });
   
    $("#username").attr("disabled","disabled"); 
    $("#password").removeAttr("required");
    $(".rmv_corner").removeClass("corner labeled");
    $(".rmv_corner .ui.left.corner.label").remove();
  }

  $scope.save = function(){
    if ( $('.ui.form').form('is valid') ){
      $scope.spiner_save = true;

      console.log("save");
      console.log($scope.profile);

      $http.post('./api/?user=s', $scope.profile, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        console.log(r);

        if (r.data.id != "0")
          $scope.profile.id = r.data.id;

        if (r.data.error[1] == null)
          $scope.msg = "Profile enregistrer";
        else
          $scope.msg = r.data.error[2];
        
        console.log("-> done!");
        $scope.spiner_save = false;
        delete $scope.$parent.user_list;
        $location.path('user_list');
      },      
      function(){
        $scope.msg = "Erreur d'enregistrement";
        console.log("-> field");
        $scope.spiner_save = false;
      });
    }
  }

  $scope.delete = function(){
    $scope.spiner_del = true;
    if ($scope.profile.id != "0" && $scope.profile.id != "" && confirm("Etre vous sure de vouloir supprimer ce profile ?")){
      
      $http.post('./api/?user=d&id='+$scope.profile.id)
      .then(function (r) {
        console.log(r);
        if (!r.data.error){
          console.log("-> delete field");
          $location.path('user_list');          
        }else if (r.data.error[1] != null){
          console.log("-> delete field");
        }else{
          delete $scope.$parent.user_list;
          console.log("-> delete done!");
          $location.path('user_list');
        }
      },      
      function(){
        console.log("-> delete field");
      });
      $scope.spiner_del = false;
    }else{
      $scope.spiner_del = false;
    }
  }

})




.controller('SettingsController', function ($scope,$http) {
  $scope.loading = false;
  $scope.settings = {'id':null,'username':null,'password':null,'firstname':null,'lastname':null,'email':null,'department':null,'dir':null,'mobile':null,'tel':null,'fax':null,'address':null,'lat':null,'long':null,'signature':null,'policy':null};

  $('.message .close')
    .on('click', function() {
      $(this)
        .closest('.message')
        .transition('fade')
      ;
    })
  ;

  $scope.save = function(){
    if ( $('.ui.form').form('is valid') ){
      $scope.loading = true;

      console.log("save");
      console.log($scope.profile);

      $http.post('./api/?user=s', $scope.profile, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        console.log(r);

        if (r.data.id != "0")
          $scope.profile.id = r.data.id;

        if (r.data.error[1] == null)
          $scope.msg = "Profile enregistrer";
        else
          $scope.msg = r.data.error[2];
        
        console.log("-> done!");
        $scope.loading = false;
        delete $scope.$parent.user_list;
        $location.path('user_list');
      },      
      function(){
        $scope.msg = "Erreur d'enregistrement";
        console.log("-> field");
        $scope.loading = false;
      });
    }
  }

  $scope.delete = function(){
     $scope.loading = true;
    if ($scope.profile.id != "0" && $scope.profile.id != "" && confirm("Etre vous sure de vouloir supprimer ce profile ?")){
      
      $http.post('./api/?user=d&id='+$scope.profile.id)
      .then(function (r) {
        console.log(r);
        if (!r.data.error){
          console.log("-> delete field");
          $location.path('user_list');          
        }else if (r.data.error[1] != null){
          console.log("-> delete field");
        }else{
          delete $scope.$parent.user_list;
          console.log("-> delete done!");
          $location.path('user_list');
        }
      },      
      function(){
        console.log("-> delete field");
      });
      $scope.loading = false;
    }else{
      $scope.loading = false;
    }
  }
})




// ==================================================================================================
;




$('img')
  .visibility({
    type       : 'image',
    transition : 'fly down in',
    duration   : 1000
  })
;

$('.dropdown')
  .dropdown({
    on: 'hover',
    transition: 'slide down'
  })
;

