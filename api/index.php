<?php
// Include FireWorks lib
require_once('../bin/fw.php');
//============================================================================================
header('Content-Type: application/json');

$sql = "";
$err = "";
$result = "";
$debug = isset($_GET["debug"])?true:false;

//============================================================================================
if (isset($_GET['signout']))
{
    $fw->signout();
    $result = true;
}

//============================================================================================
else if (isset($_GET['signin']))
{
    if ( isset($_GET["u"]) && ($_GET["u"] != "") && isset($_GET["p"]) && ($_GET["p"] != "") )
    {
        if ($fw->signin( $_GET["u"], $_GET["p"] ) )
            $result = true;
    }
    else
    {
        $result = $fw->signin();
    }
}

//============================================================================================
else if ($fw->signin())
{
    
    //============================================================================================
    if (isset($_GET['session']))
    {
        if ($_SESSION['user'])
        {
            $result = $_SESSION['user'];
        }
        else
        {
            $err = "Session not found!";
        }
    }
    
    //============================================================================================
    else if (isset($_GET['user']))
    {
        
        if ( $_GET['user'] =='s' )
        { // save

            $profile = get_json(1);

            
            // ID
            if (isset($profile->id) && intval($profile->id) != 0 )
            {
                $id = $profile->id;
                if (strlen($profile->password)<6)
                    unset($profile->password);
                else
                    $profile->password = base64_encode($profile->password); // replace password by crypted base64 password
            }
            else
            {
                $id = null;
            }
            
            unset($profile->id);
            unset($profile->gravatar);
            
            // Policy
            $profile->policy = isset($profile->policy)?json_encode($profile->policy):'';

            $sql = $fw->sql_gen('user',$profile, $id);
            $result = $fw->fetchAll($sql,true,$debug);

        }
        else if ( $_GET['user'] =='d' )
        { // delete

            if (isset($_GET['id']) && intval($_GET['id']) !=0 )
            {
                $result = $fw->fetchAll("DELETE FROM $fw->tb_user WHERE id='$_GET[id]'",true);
            }
            else
            {
                $result = "delete field";
            }

        }
        else if ( $_GET['user'] =='a' || $_GET['user'] == 'l' || intval($_GET['user']) != 0 || substr($_GET['user'],0,1) =='@')
        { // A all, L sist, id, @username
            
            if (intval($_GET['user']) != 0)
                $where = "id='$_GET[user]'";

            else if (substr($_GET['user'],0,1) =='@')
                $where = "username='".substr($_GET['user'],1)."'";

            else
                $where = "1";

            $result = $fw->fetchAll("SELECT * FROM $fw->tb_user WHERE $where");
            foreach ($result as $value)
            {
                $value->gravatar = $fw->gravatar($value->email);
                $value->policy   = json_decode($value->policy);
                $value->password = null;
            }
                
        }
        else
        {
            $result = $_SESSION['user'];
        }
    
    
    }
    
    //============================================================================================
    else if (isset($_GET['contrat']))
    {

            $wr = ( isset($_GET['n']) && $_GET['n'] != "0") ? "WHERE id=".$fw->sql_inj($_GET['n']) : "";
            
            if ($_GET['contrat'] == "update")
            {
                $contrat = get_json(1);

                if ($_GET['tc'] == "pr")
                { // if procurement
                    if (!isset($contrat->nature)  || $contrat->nature  == "") $err = "Nature de cahiers des charges";
                    if (!isset($contrat->type)    || $contrat->type    == "") $err = "Type de cahiers des charges";
                    if (!isset($contrat->id)      || $contrat->id      == "") $err = "ID";
                
                }
                else if ($_GET['tc'] == "st")
                { // if sous traitant
                    if (!isset($contrat->int_prj) || $contrat->int_prj == "") $err = "Intitulé du projet";
                    if (!isset($contrat->pole)    || $contrat->pole    == "") $err = "Pole";
                    if (!isset($contrat->dir)     || $contrat->dir     == "") $err = "Responsable de la structure bénéficiaire";
                    if (!isset($contrat->type)    || $contrat->type    == "") $err = "Type de contrats";
                    if (!isset($contrat->id)      || $contrat->id      == "") $err = "ID";

                }
                else if ($_GET['tc'] == "et")
                { // if etude
                    if (!isset($contrat->id)      || $contrat->id      == "") $err = "ID";
                    if (!isset($contrat->dir)     || $contrat->dir     == "") $err = "Responsable de la structure bénéficiaire";
                    if (!isset($contrat->pole)    || $contrat->pole    == "") $err = "Pole";
                    if (!isset($contrat->int_prj) || $contrat->int_prj == "") $err = "Intitulé du projet";
                }
                else
                { // else error
                    $err = "Erreur non reconue !!!";
                }

                if (!$err)
                {
                    $sql = $fw->sql_gen("contrats_".$_GET['tc'], $contrat, $contrat->id);
                    //$result = $fw->fetchAll($sql,true,true);
                    
                }else{
                    $err = "Erreur de parametre  manquant !!!";
                }

            }else if ($_GET['contrat'] == "dlpr"){ // delete Procurements
                if ($wr != "") $sql = "DELETE FROM contrats_pr $wr";
            }else if ($_GET['contrat'] == "dlst"){ // delete Soustraitances
                if ($wr != "") $sql = "DELETE FROM contrats_st $wr";
            }else if ($_GET['contrat'] == "dlet"){ // delete Etudes
                if ($wr != "") $sql = "DELETE FROM contrats_et $wr";
           

            }else if ($_GET['contrat'] == "pr"){ // list Procurements
                $sql = "SELECT * FROM contrats_pr $wr ORDER BY id";
            }else if ($_GET['contrat'] == "st"){ // list Soustraitances
                $sql = "SELECT * FROM contrats_st $wr ORDER BY id";
            }else if ($_GET['contrat'] == "et"){ // list Etudes
                $sql = "SELECT * FROM contrats_et $wr ORDER BY id";
            }
            
            else if ($_GET['contrat'] == null)
            {

            }
            else 
            {

            }

            $result = $fw->fetchAll($sql,true);


    }

    //============================================================================================
    else if (isset($_GET['produit']))
    {
        if (isset($_GET['all']))
        {
            $result = $fw->fetchAll("SELECT * FROM produits WHERE 1");
        }
    }

    //============================================================================================
    else if (isset($_GET['contact']))
    {
        if ($_GET['contact']=="fournisseur")
            $sql = "SELECT * FROM contacts WHERE type='fournisseur'";
        else if ($_GET['contact']=="sous-traitant")
            $sql = "SELECT * FROM contacts WHERE type='sous traitant'";
        else if ($_GET['contact']!="") 
            $sql = "SELECT * FROM contacts WHERE nom like '%$_GET[contact]%'";
        else
            $sql = "SELECT * FROM contacts WHERE 1";

        $result = $fw->fetchAll($sql);
    }
    
    //============================================================================================
    else if (isset($_GET['acl']))
    {
    
        if ($_GET['acl']!="")
        {
            $result = $fw->policy($_GET['acl']);
        }
        else
        {
            $result = 0; 
        }
    }


//============================================================================================
}


//============================================================================================

$ret = new \stdClass;
$ret = $result;
if ($err) $ret['message'] = $err;

if (isset($_GET["pre"]))
    print_r( $ret );
else
    echo json_encode( $ret );

//============================================================================================




function get_json($decode = false)
{
    $putjson = fopen("php://input", "r");
    $json = "";
    while (!feof($putjson))
        $json .=fgets($putjson);
    fclose($putjson);
    if (!$decode)
        return $json;
    else
        return json_decode($json);
}
