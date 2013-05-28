<?php class url extends sn {
	
public static $region_id;
public static $action;
public static $login;
public static $password;
public static $callback;

function __construct() {


	if (isset($_REQUEST["action"])) {
		self::$action=trim(strval($_REQUEST["action"]));
	}
	if (isset($_REQUEST["callback"])) {
		self::$callback=trim(strval($_REQUEST["callback"]));
	}

	if (isset($_REQUEST["login"])) {
		self::$login=trim(strval($_REQUEST["login"]));
	}

	if (isset($_REQUEST["password"])) {
		self::$password=trim(strval($_REQUEST["password"]));
	}


	if (isset($_REQUEST["region_id"])) {
		self::$region_id=trim(strval($_REQUEST["region_id"]));
	}

		
}


} ?>
