<?php class signin extends sn {
	
public static $key;
public static $type;
public static $login;
public static $name;
public static $password;
public static $hash;

function __construct() {
	self::$key = "";
}

public static function check($j=array()) {
	
	if (self::request()) {
		switch (self::$type) {
		// case "key":
		// 	if (self::$key==self::salt($j)) {
		// 		self::$name=$j->name;
		// 		self::$login=$j->login;
		// 		self::updSession();
		// 		return true;
		// 	}
		// break;
		case "hash":
			if (query(sql::signin(self::$login,self::$hash),$m)) {
				if (isset($m[0])) {
					return true;
				}
			}
		break;
		case "login":
			$hash=strtoupper(md5(self::$password));
			if (query(sql::signin(self::$login,$hash),$m)) {
				if (isset($m[0])) {
					if (isset($m[0]->ID)) {
						// self::updSession();
						$j['id']=$m[0]->ID;
						$j['login']=self::$login;
						$j['hash']=$hash;
						return $j;
					}
				}
			}
		break;
		}
	}
	// self::unsetSession();
	return false;
}

public static function unsetSession() {
	unset($_SESSION['key']);
	unset($_SESSION['login']);
	unset($_SESSION['password']);
}

public static function updSession() {
	$_SESSION['key']=self::$key;
	$_SESSION['login']=self::$login;
	$_SESSION['password']=self::$password;
}

public static function salt($j) {
	return sha1(date("dj.STANDART-N").sha1($j->login).$j->password);
}

public static function pwd($s) {
	return sha1($s);
}

/*
public static function data(&$j,$p="",$f="") {

	$p=project."/settings/signin.json";
	if (file_exists($p)) { $f=file_get_contents($p); }	
	if ($f!="") { 
		$j=json_decode($f);	
		if ($j->users) {
			if (sizeof($j->users)>0) {
				return true;
			}
		}		
	}
	return false;
}
*/

public static function request() {	
	
	// if (isset(url::$key)) {
	// 	if (url::$key!='') {
	// 		self::$key=url::$key;
	// 		self::$type='key';
	// 		return true;
	// 	}
	// }

	// if (isset($_SESSION['key'])) {
	// 	if ($_SESSION['key']!='') {
	// 		self::$key=$_SESSION['key'];
	// 		self::$type='key';
	// 		return true;
	// 	}

	// }

	if ((isset(url::$login)) && (isset(url::$hash))) {
		if ((url::$login!='') && (url::$hash!='')) {
			self::$login=url::$login;
			self::$hash=url::$hash;
			self::$type='hash';
			return true;
		}
	}	


	if ((isset(url::$login)) && (isset(url::$password))) {
		if ((url::$login!='') && (url::$password!='')) {
			self::$login=url::$login;
			self::$password=url::$password;
			self::$type='login';
			return true;
		}
	}	

	if ((isset($_SESSION['login'])) && (isset($_SESSION['password']))) {
		if (($_SESSION['login']!='') && ($_SESSION['password']!='')) {
			self::$login=$_SESSION['login'];
			self::$password=$_SESSION['password'];
			self::$type='login';
			return true;
		}
	}

	self::unsetSession();
	return false;
}

public static function depart() {
	self::unsetSession();
	return "depart";
}

} ?>
