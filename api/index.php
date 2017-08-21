<?php
// Include FireWorks lib
require_once('../bin/fw.php');
//============================================================================================
header('Content-Type: application/json');

$result = array();

if (isset($_GET['signout'])){
    $fw->signout();
    $result[0]= 'done!';

}else if (isset($_GET['signin'])){
    if ( isset($_GET["u"]) && ($_GET["u"] != "") && isset($_GET["p"]) && ($_GET["p"] != "") ){
        if ($fw->signin( $_GET["u"], $_GET["p"] ) )
            $result[0] = 'done!';
    }else{
        $result[0] = $fw->signin();
    }

}else if ($fw->signin()){
//============================================================================================

    if (isset($_GET['user'])){
        
        if ( $_GET['user'] =='s' ){ // save

            $profile = get_json(1);

            
            // ID
            if (isset($profile->id) && intval($profile->id) != 0 ){
                $id = $profile->id;
                if (strlen($profile->password)<6)
                    unset($profile->password);
            }else{
                $id = null;
            }
            
            unset($profile->id);
            unset($profile->gravatar);
            
            // Policy
            $profile->policy = isset($profile->policy)?json_encode($profile->policy):'';

            $sql = $fw->sql_gen('user',$profile, $id);
            $result = $fw->fetchAll($sql,true,true);

        }else if ( $_GET['user'] =='d' ){ // delete

            if (isset($_GET['id']) && intval($_GET['id']) !=0 ){
                $result = $fw->fetchAll("DELETE FROM $fw->tb_user WHERE id='$_GET[id]'",true);
            }else
                $result = "delete field";

        }else if ( $_GET['user'] =='a' || $_GET['user'] == 'l' || intval($_GET['user']) != 0 || substr($_GET['user'],0,1) =='@'){ // A all, L sist, id, @username
            
            if (intval($_GET['user']) != 0)
                $where = "id='$_GET[user]'";

            else if (substr($_GET['user'],0,1) =='@')
                $where = "username='".substr($_GET['user'],1)."'";

            else
                $where = "1";

            $result = $fw->fetchAll("SELECT * FROM $fw->tb_user WHERE $where");
            foreach ($result as $value) {
                $value->gravatar = $fw->gravatar($value->email);
                $value->policy   = json_decode($value->policy);
                $value->password = null;
            }
                
        }else{
            $result = $_SESSION['user'];
        }
    
    }else if (isset($_GET['prod'])){
        
        if (isset($_GET['all'])){
            $result = $fw->fetchAll("SELECT * FROM $fw->tb_user WHERE 1");
        
        }else if (isset($_GET['add'])){
            $result = "not yet";
        }

    }
//============================================================================================
}


// The END ===================================================================================
if (isset($_GET["debug"]))
{
    echo "<pre>";
    
    echo "\rPOST\r";
    print_r($_POST);
    
    echo "\rGET\r";
    print_r($_GET);

    echo "\rGET JSON string\r";
    print_r(get_json());
    
    echo "\rGET JSON decode\r";
    print_r(get_json(1));
    
    if (isset($sql)){
        echo "\rSQL\r";
        print_r($sql);
    }

    if (isset($result)){
        echo "\rRESULT\r";
        print_r($result);
    }

    if (isset($msg)){
        echo "\rMSG\r";
        print_r($msg);
    }
    
    echo "\r</pre>\r<hr>\r";
}
if (isset($_GET["session"]))
{
    echo "<pre>\rSESSION\r";
    print_r($_SESSION);
    echo "</pre><hr>";
}
if (isset($_GET["pre"]))
{
    echo "<pre>";
    print_r( $result );
    echo "</pre>";
}
else
    echo json_encode( $result );
//============================================================================================




function get_json($decode = false){
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
