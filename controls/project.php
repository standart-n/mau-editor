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
		case "addNewMark":
			return self::addNewMark();
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
	$j['tm']=time();	
	if (signin::check()) { $j['signin']=true; } else { $j['signin']=false; }
	return $j;
}

public static function addNewMark($j=array()) {
	$j['res']=editor::addNewMark();
	$j['tm']=time();	
	return $j;
}


} ?>
