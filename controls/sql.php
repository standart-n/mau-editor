<?php class sql extends sn {
	
public static $id;
public static $request;
public static $response;

function __construct() {

}

public static function getPoints($s="") {
	$s.="select ";
	$s.="POINT, D\$UUID, VID_ID, SVID, PLAN_PERIOD_END ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and PERIOD_END is null";
	return $s;
}

public static function getBalloonContent($uuid,$s="") {
	$s.="select * ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and PERIOD_END is null and D\$UUID = '".$uuid."' ";
	return $s;
}

public static function signin($login,$password,$s="") {
	$s.="select id from sp\$users where fio='".$login."' and  USERPSW='".$password."'";
	return $s;
}

public static function addNewMark($userid,$vid,$s="") {
	$s.="insert into bad_roads ";
	$s.="(INSERTSESSION_ID,USER_ID,STATUS,AGENT_D\$UUID,PERIOD_BEG,PLAN_PERIOD_END,PERIOD_END,INFO,VID_ID,POINT) ";
	$s.="values (1,".$userid.",0,'DF936F7A-1411-864F-A861-601A7B68FE15','30.05.2013',null,null,null,".$vid.",'0000') ";
	return $s;
}

public static function getNewMark($s="") {
	$s.="select D\$UUID as ID from bad_roads where point='0000'";
	return $s;
}

public static function editNewMark($id,$lat,$lon,$s="") {
	$s.="update bad_roads set point='[".$lat.",".$lon."]' where D\$UUID='".$id."' ";
	return $s;
}

public static function getPointById($uuid,$s="") {
	$s.="select ";
	$s.="POINT, D\$UUID, VID_ID, SVID, PLAN_PERIOD_END ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and D\$UUID = '".$uuid."' and PERIOD_END is null";
	return $s;
}


} ?>
