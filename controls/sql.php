<?php class sql extends sn {
	
public static $id;
public static $request;
public static $response;

function __construct() {

}

public static function getPoints($s="") {
	$s.="select ";
	$s.="POINT, D\$UUID, VID_ID, PLAN_PERIOD_END ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and PERIOD_END is null";
	return $s;
}


} ?>
