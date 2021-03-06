<?php class project extends sn {

public static $tm;
public static $text;
public static $error;
public static $line_ms;

function __construct() {
	session_start();
}

public static function engine() {
	switch(url::$action) {
		case "signin":
			return self::signin();
		break;
		case "getPoints":
			return self::getPoints();
		break;
		case "getBalloonContent":
			return self::getBalloonContent();
		break;
		case "getAgents":
			return self::getAgents();
		break;
		case "createMark":
			return self::createMark();
		break;
		case "removeMark":
			return self::removeMark();
		break;
		case "saveMark":
			return self::saveMark();
		break;
		case "dragMark":
			return self::dragMark();
		break;
		case "editStreet":
			return self::editStreet();
		break;
	}
	return false;
}


public static function signin($j=array()) {
	// if (signin::check()) {
		//if (editor::getStatus($status)) {
			$j['signin']=signin::check();
			$j['tm']=time();
		//}
	// } else {
	// 	$j['signin']=false;
	// }
	return $j;
}


public static function getPoints($j=array()) {
	$j['points']=editor::getPoints();
	$j['tm']=time();
	return $j;
}

public static function getBalloonContent($j=array()) {
	$j['content']=editor::getBalloonContent();
	$j['agents']=editor::getAgents();
	$j['tm']=time();
	if (signin::check()) { $j['signin']=true; } else { $j['signin']=false; }
	return $j;
}

public static function getAgents($j=array()) {
	$j['agents']=editor::getAgents();
	$j['tm']=time();
	return $j;
}

public static function addNewMark($j=array()) {
	$j['res']=editor::addNewMark();
	$j['tm']=time();	
	return $j;
}

public static function removeMark($j=array()) {
	$j['res']=editor::removeMark();
	$j['tm']=time();	
	return $j;
}

public static function createMark($j=array()) {
	$j['res']=editor::createMark();
	$j['tm']=time();
	//$j['sql']=sql::$query;
	return $j;
}

public static function saveMark($j=array()) {
	$j['res']=editor::saveMark();
	$j['tm']=time();	
	return $j;
}

public static function dragMark($j=array()) {
	$j['res']=editor::dragMark();
	$j['tm']=time();
	return $j;
}

public static function editStreet($j=array()) {
	$j['res']=editor::editStreet();
	$j['tm']=time();
	return $j;
}


} ?>
