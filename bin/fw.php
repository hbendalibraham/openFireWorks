<?php
//date_default_timezone_set('UTC');
date_default_timezone_set('Africa/Algiers');
setlocale(LC_MONETARY, 'dz_DZA');

session_cache_limiter('nocache');
//session_cache_expire(10);
session_start();

ini_set("display_errors", 1);

// Prepart connexion à la base de données
// FireWorks ('host|username|password|bdd');
$fw = new FireWorks('127.0.0.1|root|genesis|tinycms');

//$fw->telegram_api = "156659332:AAFCyXi94dL02gXaHlzRGw7Mk9WZsfMMN1A";
//$fw->telegram_id  = "127969204";

class FireWorks{

    private static $databases;
    private $connection;
    public $tb_user      = "user";
    public $tb_log       = "log";
    public $telegram_api;
    public $telegram_id;


    public function __construct($connDetails){
        if(!is_object(self::$databases[$connDetails])){
            list($host, $user, $pass, $dbname) = explode('|', $connDetails);
            $dsn = "mysql:host=$host;dbname=$dbname";
            self::$databases[$connDetails] = new PDO($dsn, $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        }
        $this->connection = self::$databases[$connDetails];
       
        $this->signupdate();
    }

    // RUN SQL =========================================================
    public function fetchAll($sql,$result = null,$debug = null){
        $args = func_get_args();
        array_shift($args);
        $statement = $this->connection->prepare($sql);
        $statement->execute($args);

        if ($result){
            $result = array();
            $result['sqlState']  = $statement->errorInfo()[0];
            $result['errorCode'] = $statement->errorInfo()[1];
            $result['message']   = $statement->errorInfo()[2];
            $result['id']        = $this->connection->lastInsertId();
            $result['result']    = $statement->fetchAll(PDO::FETCH_OBJ);

            if ($debug)
             $result['sqlquery'] = $sql;

            return $result;
        }else
            return $statement->fetchAll(PDO::FETCH_OBJ);
    }


    // SQL Generate INSERT or UPDATE ===================================
    public function sql_gen($table, $fields = array(), $id="")
    {
        if ( strtoupper($id) =="SELECT"){ // SELECT x,x,x,x,
            $keys = "";
            foreach ( $fields as $key )
            {
                $keys .= "`$key`,";
            }
            $keys = substr($keys,0,-1);
            return "SELECT $keys FROM $table WHERE `id`='$id'";

        }else if (intval($id)==0){ // INSERT
            $keys = "";
            $vals = "";
            foreach ( $fields as $key => $val )
            {
                $keys .= "`". $this->sql_inj($key) ."`,";
                $vals .= $this->reformat_date($key,$val).",";
            }
            $keys = substr($keys,0,-1);
            $vals = substr($vals,0,-1);
            return "INSERT INTO $table ($keys) VALUES ($vals)";

        }else{ // UPDATE
            $element = "";
            foreach ( $fields as $key => $val )
            {
                $element .= "`". $this->sql_inj($key) ."`=". $this->reformat_date($key,$val) .",";
            }
            $element = substr($element,0,-1);
            return "UPDATE $table SET $element WHERE `id`='$id'";
        }
    }

    // SQL Injection ===================================================
    function sql_inj($value)
    {
        $search = array("\\",  "\x00", "\n",  "\r",  "'",  '"', "\x1a");
        $replace = array("\\\\","\\0","\\n", "\\r", "\'", '\"', "\\Z");
        return str_replace($search, $replace, $value);
    }

    // Reformat value if field is date =================================
    public function reformat_date($key, $val)
    {
        if (substr($key,0,5) =="date_")
        {
            $val = "'".date("Y-m-d", strtotime( substr($val, 0, strpos($val, '('))))."'";
            if ($val=="'1970-01-01'") $val="null";
        }else{
            $val = "'".$this->sql_inj($val)."'";
        }
        return $val;
    }

    // TELEGRAM ========================================================
    public function telegram($message)
    {
        if ($telegram_api != "" && $telegram_id != "")
        {
            $message = htmlentities($message);
            $result = file_get_contents("https://api.telegram.org/bot$telegram_api/sendMessage?chat_id=$telegram_id&text=$message");
            //$result = json_decode($result, true);
        }
    }

    // AVATAR ==========================================================
    public function gravatar( $email, $img = false, $s = 80, $d = 'mm', $r = 'g', $atts = array() ) {
        //

        $url = 'https://www.gravatar.com/avatar/' . md5( strtolower( trim( $email ) ) );
        //$url = './img/mm.png';

        if ( $img ) {
            $url .= "?s=$s&d=$d&r=$r";

            $url = '<img src="' . $url . '"';
            foreach ( $atts as $key => $val )
                $url .= ' ' . $key . '="' . $val . '"';
            $url .= ' />';
        }


        return $url;
    }

    // LOG =============================================================
    public function log($msg)
    {
        $this->fetchAll("INSERT INTO $this->tb_log (ip,username,msg) VALUES ( '$_SERVER[REMOTE_ADDR]','".(isset($_SESSION['user']) ? $_SESSION['user']->email : "Guest")."','".htmlentities($msg)."')");
    }

    // SIGNIN ==========================================================
    public function signin( $username=null , $password=null ) {
        global $_SESSION;
        $ret = false;
        if ( $username==null && $password==null )
        {
            if ( isset($_SESSION['user']) )
                $ret = true;
        }else{
            $username = $this->sql_inj($username);
            $password = $this->sql_inj($password);
            $sha_pwd = $password; //sha1($password);

            $result =  $this->fetchAll("SELECT * FROM $this->tb_user WHERE ( username='$username' OR email='$username' ) AND password='$sha_pwd'")[0];
            if (isset($result)){
                $_SESSION['user'] = $result;
                $this->signupdate();

                $this->log( "SIGNIN ".$username ) ;
                $ret = true;
            }else{
                $this->signout();
                $this->log( "ACCESS DENIED / $username / $password / " ) ;
            }
        }

        return $ret;
    }

    // SIGNOUT =========================================================
    public function signout() {
        global $_SESSION;
        if (isset($_SESSION['user']))
        {
            $this->log( "SIGNOUT / ".$_SESSION['user']->username." / " ) ;
            $_SESSION['user'] = null;
            unset($_SESSION);
        }
        session_destroy();
    }

    // SIGNUPDATE =========================================================
    public function signupdate() {
        global $_SESSION;
        
        if ( isset($_SESSION['user']) ){
            $id = $_SESSION['user']->id;

            $this->fetchAll("UPDATE `user` SET `last_update` = now() WHERE `id` = '$id'");
            $s = $this->fetchAll("SELECT * FROM user WHERE `id` = '$id'")[0];
            $s->gravatar = $this->gravatar($s->email);
            $s->policy = json_decode($s->policy);
            unset($s->password);
            $_SESSION['user'] = $s;
        }
    }

    // ACCESS =========================================================
    public function policy($acl) {
        global $_SESSION;
        if (isset($_SESSION['user']))
            return isset($_SESSION['user']->policy->$acl)?$_SESSION['user']->policy->$acl:false;
        else
            return false;

    }
}
