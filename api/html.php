<?php
require_once('../bin/fw.php');

if ($fw->signin()){
  echo_html(key($_GET));
}

function echo_html($element){
  global $fw;
  switch ($element) {

// ==  policyProfile  ===================================================================================   
  case 'policyProfile':
    if($fw->policy('level') == "1")
    echo '<div class="ui red ribbon label">
    <i class="shield icon"></i> Les droit d\'acc&egrave;s
  </div>
  <div class="ui divided selection list">
    <div class="item">
      <i class="la la-unlock s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_lock" ng-model="profile.policy.lock">
        <label>Lock</label>
      </div>
    </div>
    <div class="item">
      <i class="la la-shield s1 en"></i>
      <div class="ui radio checkbox">
        <input type="radio" name="policy_level1" ng-model="profile.policy.level" value="1">
        <label>Admin</label>
      </div>
    </div>
    <div class="item">
      <i class="la la-user s1 en"></i>
      <div class="ui radio checkbox">
        <input type="radio" name="policy_level2" ng-model="profile.policy.level" value="2">
        <label>User</label>
      </div>
    </div>
    <div class="item">
      <i class="la la-user-plus s1 en"></i>
      <div class="ui radio checkbox">
        <input type="radio" name="policy_level3" ng-model="profile.policy.level" value="3">
        <label>User advence</label>
      </div>
    </div>
    <div class="item">
      <i class="la la-flask s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_beta" ng-model="profile.policy.beta">
        <label>Beta function</label>
      </div>
    </div>
  </div>';
    break;



  }
}