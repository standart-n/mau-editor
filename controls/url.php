<?php class url extends sn {
	
public static $region_id;
public static $action;
public static $uuid;
public static $userid;
public static $agentid;
public static $login;
public static $password;
public static $hash;
public static $vid;
public static $lat;
public static $lon;
public static $info;
public static $callback;

function __construct() {


	if (isset($_REQUEST["action"])) {
		self::$action=trim(strval($_REQUEST["action"]));
	}
	if (isset($_REQUEST["callback"])) {
		self::$callback=trim(strval($_REQUEST["callback"]));
	}

	if (isset($_REQUEST["uuid"])) {
		self::$uuid=trim(strval($_REQUEST["uuid"]));
	}

	if (isset($_REQUEST["login"])) {
		self::$login=trim(strval($_REQUEST["login"]));
	}

	if (isset($_REQUEST["userid"])) {
		self::$userid=trim(intval($_REQUEST["userid"]));
	}

	if (isset($_REQUEST["password"])) {
		self::$password=trim(strval($_REQUEST["password"]));
	}

	if (isset($_REQUEST["hash"])) {
		self::$hash=trim(strval($_REQUEST["hash"]));
	}

	if (isset($_REQUEST["lat"])) {
		self::$lat=trim(floatval($_REQUEST["lat"]));
	}

	if (isset($_REQUEST["lon"])) {
		self::$lon=trim(floatval($_REQUEST["lon"]));
	}

	if (isset($_REQUEST["info"])) {
		self::$info=trim(strval($_REQUEST["info"]));
	}

	if (isset($_REQUEST["vid"])) {
		self::$vid=trim(intval($_REQUEST["vid"]));
	}


	if (isset($_REQUEST["region_id"])) {
		self::$region_id=trim(strval($_REQUEST["region_id"]));
	}

		
}


} ?>