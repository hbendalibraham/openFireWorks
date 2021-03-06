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
      controller: 'contactsListCtrl'
    })
    .when('/contact/:id', {
      templateUrl: 'templates/contact.html',
      controller: 'contactCtrl'
    })

    .when('/settings', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController'
    })

    .when('/contrats_list', {
      templateUrl: 'templates/contrats_list.html',
      controller: 'ContratsListController'
    })

    .when('/produit_list', {
      templateUrl: 'templates/produit_list.html',
      controller: 'produitListCtrl'
    })
    .when('/produit/:id', {
      templateUrl: 'templates/produit.html',
      controller: 'produitCtrl'
    })

    .when('/contrat_pr/:id/:tp', {
      templateUrl: 'templates/contrat_pr.html',
      controller: 'ContratPrController'
    })

    .when('/contrat_st/:id/:tp', {
      templateUrl: 'templates/contrat_st.html',
      controller: 'ContratStController'
    })

    .when('/contrat_et/:id', {
      templateUrl: 'templates/contrat_et.html',
      controller: 'ContratEtController'
    })


    .when('/qse', {
      templateUrl: 'templates/qse.html'
    })

    .when('/formulaire_QSE', {
      templateUrl: 'templates/formulaire.html'
    })

    .when('/certification', {
      templateUrl: 'templates/certification.html'
    })

    .when('/about', {
      templateUrl: 'templates/about.html'
    })

    .when('/contactez_nous', {
      templateUrl: 'templates/contactez_nous.html'
    })

    .when('/help', {
      templateUrl: 'templates/help.html'
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

.filter('dateDiff', function () {
  var magicNumber = 1; //(1000 * 60 * 60 * 24);

  return function (toDate0, fromDate0) {
    toDate = new Date(toDate0); 
    fromDate = new Date(fromDate0); 
    if(toDate && fromDate){
      var dayDiff = Math.floor((toDate - fromDate) / magicNumber);
      if (angular.isNumber(dayDiff)){
        //console.log('dayDiff: ' + dayDiff);
        return dayDiff + 1;
      }
    }
  };
})

// ==================================================================================================
// == BETA ==========================================================================================
// ==================================================================================================
// ==================================================================================================

// ==================================================================================================
.controller('produitListCtrl', function ($scope, $http) {
  if (!$scope.$parent.produits_list)
    $http.get('api/?produit=all')
      .then(function(res){
        $scope.$parent.produits_list = res.data;
        console.log("-> ProduitsList");
        console.log($scope.$parent.produits_list);
      })
    ;

})
// ==================================================================================================
.controller('produitCtrl', function ($scope, $http, $routeParams) {
  $scope.produit = {
    id:0,
    ref:null,
    designation:'',
    fournisseur:null,
    stock:0,
    stk_min:0,
    stk_max:0,
    u:null,
    fam:null,
    s_fam:null,
    prx_achat:0,
    prx_vente:0,
    date_fabrication:null,
    date_peremption:null,
    date_fin_guarantie:null,
    depot:'',
    note:''
  };

  $('.ui.dropdown')
    .dropdown()
  ;

  if ($routeParams.id != "0"){
    $http.get('api/?contact='+$scope.contact.id)
      .then(function(res){
        //res.data[0].credit = Number (res.data[0].credit) ;
        $scope.contact = res.data[0];
      })
    ;
  }

  $scope.submit = function(){
    if ($scope.form.$valid)
      console.log($scope.produit);
  }

  $scope.delete = function(){
  }

})
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
.controller('contactsListCtrl', function ($scope,$http) {
  if (!$scope.$parent.contacts_list)
    $http.get('api/?contact')
      .then(function(res){
        $scope.$parent.contacts_list = res.data;
      })
    ;
})
// ==================================================================================================
.controller('contactCtrl', function ($scope,$http,$routeParams,$location) {
  $scope.cv = {
    id:0,
    nom:'',
    contact:[{name:null, type:null, value:null}],
    address:'',
    type_contact:null,
    credit:0,
    note:''
  };

  $('.ui.dropdown')
    .dropdown()
  ;

  console.log($scope.cv);

  if ($routeParams.id != "0"){
    $http.get('api/?contact='+$scope.contact.id)
      .then(function(res){
        res.data[0].more_contact = angular.fromJson(res.data[0].more_contact);
        res.data[0].credit = Number (res.data[0].credit) ;
        $scope.contact = res.data[0];
        console.log("-> Contact "+$scope.contact.id);
        console.log($scope.contact);
      })
    ;
  }

  $scope.add_number = function(){
    $scope.cv.contact.push({name:null, type:null, value:null});
  }

  $scope.submit = function(){
    if ( $scope.cv_form.$valide ){
      $scope.spiner_save = true;
      $scope.cv.contact = angular.toJson($scope.cv.contact);

      console.log("save");
      console.log($scope.cv);

      $http.post('api/?contact=s', $scope.cv, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        console.log(r);

        if (r.data.id != "0")
          $scope.cv.id = r.data.id;

        if (r.data.error[1] == null)
          $scope.msg = "cv enregistrer";
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
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================

// ==================================================================================================
.controller('IndexController', function ($scope, $http) {
  $scope.$parent.date = new Date();
  console.log('- Keep live');

  if (!$scope.$parent.userList)
    $http.get('api/?user=a')
      .then(function(res){
        $scope.$parent.userList = res.data;
        console.log('- Load user list ' + $scope.$parent.userList.length );
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
.controller('UserListController', function ($scope,$http) {
  if (!$scope.$parent.userList)
    $http.get('api/?user=a')
      .then(function(res){
        $scope.$parent.userList = res.data;
        console.log('- Load user list ' + $scope.$parent.userList.length );
      })
    ;
})

// ==================================================================================================
.controller('ContactsListController', function ($scope,$http) {
  if (!$scope.$parent.contacts_list)
    $http.get('api/?contact')
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
      })
    ;
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



// ***************************************************************************************
// * Contrats list
// *
// ***************************************************************************************

.controller('ContratsListController', function ($scope, $http, $location, $routeParams) {
  $('table').tablesort();
  $('.menu .item').tab();

  //$scope.$parent.spinner = true;
  console.log("> Contrats list");

  $http.get('api/?acl=contrat_pr_al_c')
    .then(function(r){
      $scope.contrat_pr_al_c = r.data;
    });
  $http.get('api/?acl=contrat_pr_al_m')
    .then(function(r){
      $scope.contrat_pr_al_m = r.data;
    });

  $http.get('api/?acl=contrat_pr_im_c')
    .then(function(r){
      $scope.contrat_pr_im_c = r.data;
    });
  $http.get('api/?acl=contrat_pr_im_m')
    .then(function(r){
      $scope.contrat_pr_im_m = r.data;
    });

  $http.get('api/?acl=contrat_st_bt_c')
    .then(function(r){
      $scope.contrat_st_bt_c = r.data;
    });
  $http.get('api/?acl=contrat_st_bt_m')
    .then(function(r){
      $scope.contrat_st_bt_m = r.data;
    });

  $http.get('api/?acl=contrat_st_gc_c')
    .then(function(r){
      $scope.contrat_st_gc_c = r.data;
    });
  $http.get('api/?acl=contrat_st_gc_m')
    .then(function(r){
      $scope.contrat_st_gc_m = r.data;
    });

  $http.get('api/?acl=contrat_et_c')
    .then(function(r){
      $scope.contrat_et_c = r.data;
    });
  $http.get('api/?acl=contrat_et_m')
    .then(function(r){
      $scope.contrat_et_m = r.data;
    });



  if (!$scope.list_contrats_pr)
  {
    console.log("- Load PR");
    $http.get('api/?contrat=pr')
      .then(function(res){
        $scope.list_contrats_pr = res.data.result;
        //console.log($scope.list_contrats_pr)
      })
  ;   // --> $http PR => {}
  }

  if (!$scope.list_contrats_st)
  {
    console.log("- Load ST");
    $http.get('api/?contrat=st')
      .then(function(res){
        $scope.list_contrats_st = res.data.result;
        //console.log($scope.list_contrats_st)
      })  
  ;   // --> $http ST
  }

  if (!$scope.list_contrats_et)
  {
    console.log("- Load ET");
    $http.get('api/?contrat=et')
      .then(function(res){
        $scope.list_contrats_et = res.data.result;
        //console.log($scope.list_contrats_et)
      })
  ;   // --> $http ET
  }




//$scope.$parent.spinner = false;

})


// ***************************************************************************************
// * Contrat Procurement
// *
// ***************************************************************************************
.controller('ContratPrController', function ($scope, $http, $location, $routeParams, $filter) {

  console.log("> Contrats Procurement N°"+$routeParams.id);
  $scope.sc = {
    'id'   : $routeParams.id,
    'type' : $routeParams.tp
  };


  $http.get($routeParams.tp=='Achats Locaux'?'api/?acl=contrat_pr_im_m':'api/?acl=contrat_pr_im_m' )
    .then(function(r){
      console.log( r.data!==true ? "- form read only !" : "- form read write !");
      if (r.data!==true)
      {
        $("input").attr("readonly","readonly");
        $('select').attr('disabled',true);
        $('button').hide();
      }
    });

  $scope.save  = false;

  $('.dropdown')
    .dropdown()
  ;

  $('.message .close')
    .on('click', function(){
      $(this)
        .closest('.message')
        .transition('fade')
        ;
    });

  if (!$scope.$parent.fournisseur)
    $http.get('api/?contact=fournisseur')
      .then(function(r){
        console.log("- load fournisseur");
        $scope.$parent.fournisseur = r.data.result;
    });

  if ($routeParams.id != 0)
  {
    console.log("- load contrat N°" + $routeParams.id);
    $http.get('api/?contrat=pr&n=' + $routeParams.id)
    .then(function (r) {
      $scope.sc = r.data.result[0];
      $scope.sc.date_a   = $scope.sc.date_a   == null ? null : new Date($scope.sc.date_a);
      $scope.sc.date_ap  = $scope.sc.date_ap  == null ? null : new Date($scope.sc.date_ap);
      $scope.sc.date_c   = $scope.sc.date_c   == null ? null : new Date($scope.sc.date_c);
      $scope.sc.date_ev  = $scope.sc.date_ev  == null ? null : new Date($scope.sc.date_ev);
      $scope.sc.date_evg = $scope.sc.date_evg == null ? null : new Date($scope.sc.date_evg);
      $scope.sc.date_l   = $scope.sc.date_l   == null ? null : new Date($scope.sc.date_l);
      $scope.sc.date_lv  = $scope.sc.date_lv  == null ? null : new Date($scope.sc.date_lv);
      $scope.sc.date_o   = $scope.sc.date_o   == null ? null : new Date($scope.sc.date_o);
      $scope.sc.date_v   = $scope.sc.date_v   == null ? null : new Date($scope.sc.date_v);
      $scope.sc.date_vg  = $scope.sc.date_vg  == null ? null : new Date($scope.sc.date_vg);
      $scope.show_valide_btn = false;
    });
  }

  $scope.submit=function(){

    if ($scope.sc){
      $scope.save = 1;

      $scope.sc.nature = document.getElementById("sc_nature").value;
      $scope.sc.pole   = document.getElementById("sc_pole").value;
      $scope.sc.dir    = document.getElementById("sc_dir").value;

      $http.post('api/?contrat=update&tc=pr', $scope.sc, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        $scope.save = 2;
        if (r.data.errorCode != null){
          console.log("# Err! " + r.data.errorCode);
          $scope.msg=r.data.message;
        }else{
          console.log("# done!");
          $scope.msg="";
          $location.path('contrats_list');
        }
      },      
      function(r){
        console.log("# Err");
        console.log(r);
        $scope.msg=r.data.message;
        $scope.save = -1;
      });

    }else{
      $scope.msg='Verifiey les champs "Type de cahiers des charges" et  "Nature de cahiers des charges"';
      $scope.save = -1;
    }
  }

  $scope.delete = function(){
    $scope.del = true;
    if ($scope.sc.id != "0" && $scope.sc.id != "" && confirm("Etre vous sure de vouloir supprimer ce contrats ?")){
     
      $http.post('./api/?contrat=dlpr&n='+$scope.sc.id)
      .then(function (r) {
        if (r.data.errorCode != null){
          console.log("-> delete field");
        }else{
          console.log("-> delete done!");
          $location.path('contrats_list');
        }
      },      
      function(){
        console.log("-> delete field");
      });

      $scope.del = false;
    }else{
      $scope.del = false;
    }
  }


  $scope.$parent.spinner = false;
})

// ***************************************************************************************
// * Contrat Sous-Traitance
// ***************************************************************************************
.controller('ContratStController', function ($scope, $http, $location, $routeParams) {
  console.log("> Contrats Sous-Traitance N°"+$routeParams.id);
  $scope.save  = false;
  $scope.sc = {
    'id'   : $routeParams.id,
    'type' : $routeParams.tp,
    'dir'  : '',
    'pole' : ''
  };

  $http.get($routeParams.tp=='Batiment'?'api/?acl=contrat_st_bt_m':'api/?acl=contrat_st_gc_m' )
    .then(function(r){
      console.log( r.data!==true ? "- form read only !" : "- form read write !");
      if (r.data!==true){
        $("input").attr("readonly","readonly");
        $('select').attr('disabled',true);
        $('button').hide();
      }
    })
  ;

  $('.dropdown')
    .dropdown()
  ;

  $('.message .close')
    .on('click', function(){
      $(this)
        .closest('.message')
        .transition('fade')
      ;
    })
  ;
  
  if ($routeParams.id != 0)
  {
    $http.get('api/?contrat=st&n=' + $routeParams.id)
      .then(function (r) {
        $scope.sc = r.data[0];
        $scope.sc.date_af   = $scope.sc.date_af  == null ? null : new Date($scope.sc.date_af);
        $scope.sc.date_ovp  = $scope.sc.date_ovp == null ? null : new Date($scope.sc.date_ovp);
        $scope.sc.date_eof  = $scope.sc.date_eof == null ? null : new Date($scope.sc.date_eof);
        $scope.sc.date_rl   = $scope.sc.date_rl  == null ? null : new Date($scope.sc.date_rl);
        $scope.sc.date_enr  = $scope.sc.date_enr == null ? null : new Date($scope.sc.date_enr);
        $scope.show_valide_btn = false;
        console.log("- load contrat N°" + $routeParams.id);
      })
    ;
  }

  $scope.submit=function(){
    if ($scope.sc){
      $scope.save = 1;
      //$scope.sc.type   = document.getElementById("sc_type").value;
      $scope.sc.pole   = document.getElementById("sc_pole").value;
      $scope.sc.dir    = document.getElementById("sc_dir").value;

      $http.post('api/?contrat=update&tc=st', $scope.sc, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        $scope.save = 2;
        if (r.data.errorCode != null){
          console.log("# Err! " + r.data.errorCode);
          $scope.msg=r.data.message;
        }else{
          console.log("# done!");
          $scope.msg="";
          $location.path('contrats_list');
        }
      },      
      function(r){
        console.log("# Err");
        console.log(r);
        $scope.msg=r.data.message;
        $scope.save = -1;
      });

    }else{
      $scope.msg='Verifiey les champs "Type de cahiers des charges" et  "Nature de cahiers des charges"';
      $scope.save = -1;
    }

  }

  $scope.delete = function(){
    $scope.del = true;
    if ($scope.sc.id != "0" && $scope.sc.id != "" && confirm("Etre vous sure de vouloir supprimer ce contrats ?")){
     
      $http.post('./api/?contrat=dlst&n='+$scope.sc.id)
      .then(function (r) {
        if (r.data.errorCode != null){
          console.log("-> delete field");
        }else{
          console.log("-> delete done!");
          $location.path('contrats_list');
        }
      },      
      function(){
        console.log("-> delete field");
      });

      $scope.del = false;
    }else{
      $scope.del = false;
    }
  }

  $scope.$parent.spinner = false;

})

// ***************************************************************************************
// * Contrat Etudes
// ***************************************************************************************
.controller('ContratEtController', function ($scope, $http, $location, $routeParams) {
  console.log("> Contrats Etude N°"+$routeParams.id);
  $scope.save  = false;
  $scope.sc = {
    'id' : $routeParams.id
  };

  $http.get('api/?acl=contrat_et_m' )
    .then(function(r){
      console.log( r.data!==true ? "- form read only !" : "- form read write !");
      if (r.data!==true){
        console.log("profile readonly !");
        $("input").attr("readonly","readonly");
        $('select').attr('disabled',true);
        $('button').hide();
      }
    });

  $('.dropdown')
    .dropdown()
  ;
  $('.message .close')
    .on('click', function() {
      $(this)
        .closest('.message')
        .transition('fade')
      ;
    })
  ;

  if ($routeParams.id != 0)
  {
    $http.get('api/?contrat=et&n=' + $routeParams.id)
      .then(function (res) {
        $scope.sc = res.data[0];
        $scope.sc.date_exet = $scope.sc.date_exet == null ? null : new Date($scope.sc.date_exet);
        $scope.sc.date_ods  = $scope.sc.date_ods  == null ? null : new Date($scope.sc.date_ods);
        $scope.sc.date_pdd  = $scope.sc.date_pdd  == null ? null : new Date($scope.sc.date_pdd);
        $scope.sc.date_rp   = $scope.sc.date_rp   == null ? null : new Date($scope.sc.date_rp);
        $scope.sc.date_rd   = $scope.sc.date_rd   == null ? null : new Date($scope.sc.date_rd);
        $scope.show_valide_btn = false;
        console.log("- load contrat N°" + $routeParams.id);
      });
  }

  $scope.submit=function(){
    if ($scope.sc){
      $scope.save = 1;

      $scope.sc.dir  = document.getElementById("sc_dir").value;
      $scope.sc.pole = document.getElementById("sc_pole").value;

      $http.post('api/?contrat=update&tc=et', $scope.sc, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {
        $scope.save = 2;
        if (r.data.errorCode != null){
          console.log("# Err! " + r.data.errorCode);
          $scope.msg=r.data.message;
        }else{
          console.log("# done!");
          $scope.msg="";
          $location.path('contrats_list');
        }
      },      
      function(r){
        console.log("# Err");
        console.log(r);
        $scope.msg=r.data.message;
        $scope.save = -1;
      });

    }else{
      $scope.msg='Verifiey les champs "Type de cahiers des charges" et  "Nature de cahiers des charges"';
      $scope.save = -1;
    }
  }

  $scope.delete = function(){
    $scope.del = true;
    if ($scope.sc.id != "0" && $scope.sc.id != "" && confirm("Etre vous sure de vouloir supprimer ce contrats ?")){
     
      $http.post('./api/?contrat=dlet&n='+$scope.sc.id)
      .then(function (r) {
        if (r.data.errorCode != null){
          console.log("-> delete field");
        }else{
          console.log("-> delete done!");
          $location.path('contrats_list');
        }
      },      
      function(){
        console.log("-> delete field");
      });

      $scope.del = false;
    }else{
      $scope.del = false;
    }
  }

  $scope.$parent.spinner = false;

})



// ==================================================================================================
.controller('ProfileController', function ($scope,$http,$routeParams,$location) {
  console.log("> %cProfile",'color: #0f0');
  console.log($scope);
  $scope.spiner_save = false;
  $scope.spiner_del  = false;
  $scope.profile = {'id':null,'username':null,'password':null,'firstname':null,'lastname':null,'email':null,'department':null,'directeur':null,'mobile':null,'tel':null,'fax':null,'address':null,'signature':null,'policy':null};

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
      .then(function(r){
        $scope.profile = r.data[0];
        $("#terms").html('');
        console.log("- load "+$routeParams.id);
        console.log($scope.profile);
      });
   
    $("#username").attr("disabled","disabled"); 
    $("#password").removeAttr("required");
    $(".rmv_corner").removeClass("corner labeled");
    $(".rmv_corner .ui.left.corner.label").remove();
  }

  $scope.submit = function(z){
    //if ( $('.ui.form').form('is valid') ){
    if ( $scope.profile ){
      $scope.spiner_save = true;

      console.log("- prepare to save");
      //console.log($scope.profile);

      //$scope.profile      


      angular.forEach($scope.profile, function(value, key) {
        if (angular.isUndefined(value)){
          this.key="";
          console.log("="+key+":"+value);
        }
      });

      $http.post('api/?user=s', $scope.profile, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      .then(function (r) {

        if (r.data.id != "0")
          $scope.profile.id = r.data.id;
        
        if (r.data.errorCode == null){
          $scope.msg = "# Profile enregistrer";
          $http.get('api/?user=a')
            .then(function(res){
              z.userList = res.data;
              console.log('- Load user list ' + z.userList.length );
            })
          ;
          $location.path('user_list');

        }else{
          $scope.msg = r.data.message;
          console.log("# %cerror: "+ r.data.message, 'color:#f00;');
        }
        $scope.spiner_save = false;
      },      
      function(){
        $scope.msg = "# Erreur d'enregistrement";
        console.log("# %cfield!", 'color:#f00;');
        $scope.spiner_save = false;
      });
    }
  }

  $scope.delete = function(){
    $scope.spiner_del = true;
    if ($scope.profile.id != "0" && $scope.profile.id != "" && confirm("Etre vous sure de vouloir supprimer ce profile ?")){
      
      $http.post('api/?user=d&id='+$scope.profile.id)
      .then(function (r) {
        //console.log(r);
        console.log("- delete");
        
        if (!r.data.errorCode){
          console.log("# %cfiled!",'color:#f00');
          $location.path('user_list');          
        }else if (r.data.errorCode != null){
          console.log("# %cfiled!",'color:#f00');
        }else{
          delete $scope.$parent.userList;
          console.log("# %cdone!",'color:#0f0');
          $location.path('userList');
        }
      },      
      function(){
        console.log("# %cfiled!",'color:#f00');
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

      $http.post('api/?user=s', $scope.profile, {headers: { 'Content-Type': 'application/json; charset=utf-8' }})
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
      
      $http.post('api/?user=d&id='+$scope.profile.id)
      .then(function (r) {
        console.log(r);
        if (!r.data.err){
          console.log("-> delete field");
          $location.path('user_list');          
        }else if (r.data.err != null){
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

