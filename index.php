<?php
// Load library and session
require_once('./bin/include.php');


//$fw->log("Url: ".$_SERVER['REQUEST_URI']);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  SIGNOUT
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if (isset($_GET["signout"])){
  $fw->signout();
  unset($_SESSION["user"]);
  unset($_POST);
  unset($_GET);
  header('Location: ./');
  exit;

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  SIGNIN
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if ( isset($_POST["username"]) && isset($_POST["password"]) ){
  if (!$fw->signin( $_POST["username"], $_POST["password"] ) )
    $err="Acces Refuser";

  unset($_POST);
  unset($_GET);
  header('Location: ./');
  exit;
}

if (!isset($_SESSION["user"])){
  require_once('./templates/login.html');
  exit;
}

//$fw->fetchAll("UPDATE user SET user.date_login=current_timestamp WHERE id=$_SESSION[signin]");

?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>#Cosider Construction </title>
  <link rel="icon"       href="img/cosider.ico"/>

  <!-- JQuery -->
  <script src="js/jquery/jquery-3.2.1.js"></script>
  <script src="js/jquery/jquery.tablesort.min.js"></script>
  <!--script src="js/markdown.min.js"></script-->

  <!--  Angular  -->
  <script src="js/angular/angular.js"></script>
  <script src="js/angular/i18n/angular-locale_fr-fr.js"></script>
  <script src="js/angular/angular-route.js"></script>

  <!--  Semantic-UI  -->
  <link rel="stylesheet" type="text/css" href="semantic/semantic.min.css"/>
  <script src="semantic/semantic.min.js"></script>

  <!--  line-awesome.css  -->
  <link rel="stylesheet" href="./css/line-awesome.css"/>

  <link rel="stylesheet" href="css/my.css"/>
</head>
<body ng-app="myApp">


  <div class="ui top fixed menu"
    style=" border-bottom: 3px solid #F00;
            Background-image: url(img/banner.png);
            background-repeat: no-repeat;
            background-position: left;
            background-color: #fff;

    "><!--background-color: #152b44-->

    <div style="width: 150px;">
    </div>

    <img src="img/logo.svg" alt="" height="60px">


    <a class="item" href="#!/"><i class="la s1 la-home"></i>Accueil</a>

    <?php

      if ($fw->policy('manual_qse')){
        echo <<< QSE
        <div class="ui dropdown item top_menu">
          <i class="s1 la la-certificate"></i> Systeme documentaire QSE
            <div class="menu">
            <a class="item" href="#!/qse"> <i class="s1 la la-book"></i> Manual QSE</a>
            <a class="item" href="#!/formulaire_QSE"> <i class="s1 la la-edit"></i> Envoy des formulaire</a>
            <a class="item" href="#!/certification"> <i class="s1 la la-certificate"></i> Certification ISO</a>
          </div>
        </div>
QSE;

      }

      if ($fw->policy('contrats'))
        echo '<a class="item" href="#!/contrats_list"><i class="la s1 la-folder-open"></i>Contrats</a>';

      if ($fw->policy('contact_c') || $fw->policy('contact_m'))
        echo '<a class="item" href="#!/contacts_list"><i class="la s1 la-envelope"></i>Contacts</a>';


      if ($fw->policy('level') == 1)
        echo <<< menu_admin
    <div class="ui dropdown item top_menu">
      <i class="la s1 la-cubes" ></i> Administrateur
        <div class="menu">
          <a class="item" href="#!/user_list"> <i class="la s1 la-users"></i> List des utilisateur</a>
          <a class="item" href="#!/settings"> <i class="la s1 la-sliders"></i> Paramètres</a>
          <a class="item" href="/adminer/" target="_blank"> <i class="la s1 la-refresh"></i> Adminer</a>
          <a class="item" href="bin/phpinfo.php" target="_blank"> <i class="la s1 la-file-code-o"></i> PHP Info()</a>
        </div>
    </div>
menu_admin;

        
    ?>



function credentials() { 
$DB_USER=$_POST['auth[username]']; 
$DB_PASSWORD=$_POST['auth[password]']; 
return array('localhost', $DB_USER, $DB_PASSWORD);
}


    <div class="right menu">
      <div class="ui dropdown item">
        <?=$_SESSION["user"]->firstname.' '.$_SESSION["user"]->lastname ?>
        <!--img class="ui circular image" style="margin: 0 20px;" src="https://s.gravatar.com/avatar/abea01f5957411556b300b80cece3db7?s=36"-->
        <img src="img/transparent.png" data-src="https://s.gravatar.com/avatar/abea01f5957411556b300b80cece3db7" class="ui circular image" style="margin:0 20px;height:36px;width:36px;border:0">

        <div class="menu">
          <a class="item" href="#!/profile/@<?=$_SESSION["user"]->username?>"> <i class="la s1 la-heart-o"></i> Profile </a>
          <a class="item" href="#!/help"> <i class="la s1 la-bullhorn"></i> Raport issue </a>
          <a class="item" href="#!/help"> <i class="la s1 la-question-circle"></i> Get help </a>


          <div class="divider"></div>
          <a class="item" href="./index.php?signout"> <i class="la s1 la-sign-out"></i> Signout </a>
        </div>
      </div>
    </div>
  </div>
  
  <div style="border:0; margin-top: 60px; padding: 20px" ng-controller="IndexController" ng-view></div>

  <!--  myAppJS  -->
  <script src="js/app.js"></script>

</body>
</html>
