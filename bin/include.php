<?php
// Include FireWorks lib
require_once("fw.php");
//============================================================================================

// #Define
define("Allow","1");
define("Denied","0");

// -- Profile --------------------------------------------------------------------------------
function Profile($id){
    global $db;
    $ret = null;
    $result = $db->query("SELECT * FROM user WHERE iD='$id'");
    while ($rs = $result->fetch(PDO::FETCH_OBJ)) {
        $ret[$rs->Field] = $rs->Value;
    }
    return ($ret);
}

function Param($id = false){
    if (!$id && isset($_SESSION['id_act']))$id = $_SESSION['id_act'];
    global $db;
    return ($db->query("SELECT * FROM entreprise LEFT JOIN activity ON entreprise.id = activity.id_entreprise WHERE activity.id_act=$id")->fetch());
}

function getRow($tab, $id){
    global $db;
    return ($db->query("SELECT * FROM $tab WHERE iD='$id'")->fetch());
}

// -- Convert text to 'text' -----------------------------------------------------------------
function Query_to_html($query){
	$query = str_replace("'" ,"&#8217;" ,$query);
    $query = str_replace(" " ,"&nbsp;"  ,$query);
    $query = str_replace("\r\n" ,"<br>"  ,$query);
	return($query);
}

function Query_to_text($query){
    $query = str_replace("&#8217;", "'" ,$query);
    $query = str_replace("&nbsp;",  " " ,$query);
    $query = str_replace("<br>",   "\r\n" ,$query);
    return($query);
}

function issetor(&$var, $default = false) {
    return isset($var) ? $var : $default;
}

function input($Name, $Value=null, $Label=null, $input=true, $Required=false, $Table_chk=null, $Field_chk=null){
    if ($input)
        echo "<label>".($Label?"$Label: ":'')."<input type='text' class='ul".($Table_chk?" chk' tbl='$Table_chk' fld='$Field_chk'":"'")." name='$Name' id='$Name' value='$Value'".($Required?' required':'')."/></label>\r ";
    else
        echo ($Label?"$Label: ":'').$Value;
}

function select($Name, $Table, $Value='', $Label='', $input=true, $Add_Element=null, $Required=false){
    global $db;
    if ($input){
        echo "<label>".($Label?"$Label: ":'')."<select name='$Name' class='ul'".($Required?' required':'').">\r";
        foreach ($db->query("SELECT * FROM $Table") as $option)
            echo "<option value='$option[0]'>$option[1]</option>\r";
        echo "</select>".($Add_Element?" <img src='./img/icone/SecurityCaution.png' style='cursor:pointer;vertical-align:middle;width:22px;' onclick=\"TINY.box.show({iframe:'bin/add.php?tbl=".base64_encode('$Table')."&$Add_Element',width:300,height:130,titel:'$Label'})\"> ":null)."</label>\r ";
    }else
        echo ($Label?"$Label: ":'').$Value;
}

function register(){
    ob_start();
    system('ipconfig /all');
    $win_com=ob_get_contents();
    system('ifconfig -a');
    $linux_com=ob_get_contents();
    ob_clean();
    if ($win_com) {
        $pmac = strpos($win_com, 'physique');
        $mac = substr($win_com, ($pmac + 32), 20);
    }elseif ($linux_com) {
        $pmac = strpos($linux_com, 'HWaddr ');
        $mac = substr($linux_com, ($pmac + 7), 20);
    }else{
        $mac = "Erreur";
    }
    $mac = base64_encode(strtoupper(str_replace(":" ,"" ,$mac)));
    echo $mac;
}





