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
    echo <<< ACL
  <div class="ui red ribbon label">
    <i class="shield icon"></i> Les droit d'acc&egrave;s
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
      <i class="la la-certificate s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_manual_qse" ng-model="profile.policy.manual_qse">
        <label>Manual QSE</label>
      </div>
    </div>

    <div class="item">
      <i class="la la-folder-open s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrats" ng-model="profile.policy.contrats">
        <label>List des contrats</label>
      </div>
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_pr_al_c" ng-model="profile.policy.contrat_pr_al_c">
        <label>Consulter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_pr_al_m" ng-model="profile.policy.contrat_pr_al_m">
        <label>Modifer</label>
      </div>
      | Procurment AL
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_pr_im_c" ng-model="profile.policy.contrat_pr_im_c">
        <label>Consulter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_pr_im_m" ng-model="profile.policy.contrat_pr_im_m">
        <label>Modifer</label>
      </div>
      | Procurment Importation 
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_st_bt_c" ng-model="profile.policy.contrat_st_bt_c">
        <label>Consulter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_st_bt_m" ng-model="profile.policy.contrat_st_bt_m">
        <label>Modifer</label>
      </div>
      | Sous-Traitances BT
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_st_gc_c" ng-model="profile.policy.contrat_st_gc_c">
        <label>Consulter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_st_gc_m" ng-model="profile.policy.contrat_st_gc_m">
        <label>Modifer</label>
      </div>
      | Sous-Traitances GC
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_et_c" ng-model="profile.policy.contrat_et_c">
        <label>Consulter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contrat_et_m" ng-model="profile.policy.contrat_et_m">
        <label>Modifer</label>
      </div>
      | Etudes
    </div>

    <div class="item">
      <i class="la la-credit-card s1 en"></i>
      <div class="ui checkbox">
        List des contacts
      </div>
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contact_c" ng-model="profile.policy.contact_c">
        <label>Consulter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_contact_m" ng-model="profile.policy.contact_m">
        <label>Modifer</label>
      </div>
      | Gestion des contacts
    </div>

    <div class="item">
      <i class="la la-stack-overflow s1 en"></i>
      List des group
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_directeur" ng-model="profile.policy.directeur">
        <label>Directeur</label>
      </div>
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_chantier" ng-model="profile.policy.chantier">
        <label>Chantier</label>
      </div>
    </div>

    <div class="item">
      <i class="la la-ellipsis-v s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_facturation" ng-model="profile.policy.facturation">
        <label>Facturation</label>
      </div>
    </div>


    <div class="item">
      <i class="la la-flask s1 en"></i>
      <div class="ui checkbox">
        <input type="checkbox" name="policy_beta" ng-model="profile.policy.beta">
        <label>Beta function</label>
      </div>
    </div>


  </div>
ACL;
    break;



  }
}
