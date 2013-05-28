<?php class editor extends sn {
	
public static $type;
public static $status;

function __construct() {
	
}

public static function getPoints() {

	if (query(sql::getPoints(),$m)) {
		return $m;
	}
	return false;
}




} ?>
