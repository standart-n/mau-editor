<?php class sql extends sn {
	
public static $id;
public static $query;
public static $request;
public static $response;

function __construct() {

}

public static function getPoints($s="") {
	$s.="select ";
	$s.="POINT, D\$UUID, USER_ID, VID_ID, SVID, PLAN_PERIOD_END, STREET ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and PERIOD_END is null";
	return $s;
}

public static function getBalloonContent($uuid,$s="") {
	$s.="select * ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and D\$UUID = '".$uuid."' ";
	return $s;
}

public static function getAgents($s="") {
	//$s.="select fullname, D\$UUID from vw_agents where status=0 and fullname is not null and fullname <> ''";
	$s.="select ";
	$s.="SAGENT ";
	$s.="from VW_BAD_ROADS ";
	$s.="where 1 = 1";
	$s.="GROUP by SAGENT ";
	$s.="ORDER by SAGENT ";
	return $s;
}

public static function signin($login,$password,$s="") {
	$s.="select id from sp\$users where fio='".$login."' and  USERPSW='".$password."'";
	return $s;
}

public static function addNewMark($userid,$vid,$s="") {
	$s.="insert into bad_roads ";
	$s.="(INSERTSESSION_ID,USER_ID,STATUS,SAGENT,PERIOD_BEG,PLAN_PERIOD_END,PERIOD_END,INFO,VID_ID,POINT) ";
	//$s.="values (0,".$userid.",0,'DF936F7A-1411-864F-A861-601A7B68FE15',null,null,null,null,".$vid.",'0000') ";
	$s.="values (0,".$userid.",0,null,null,null,null,null,".$vid.",'0000') ";
	self::$query=$s;
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
	$s.="POINT, D\$UUID, USER_ID, VID_ID, SVID, PLAN_PERIOD_END, STREET ";
	$s.="from VW_BAD_ROADS ";
	$s.="where status = 0 and D\$UUID = '".$uuid."'";
	return $s;
}

public static function removeMark($userid,$id,$s="") {
	$s.="update bad_roads set status = 1 where D\$UUID='".$id."' and USER_ID=".$userid." ";
	return $s;
}

public static function saveMark($userid,$id,$agent,$info,$lat,$lon,$vid,$s="") {
	$s.="update bad_roads set ";
	$s.="SAGENT = '".$agent."', ";
	$s.="INFO = '".$info."', ";
	$s.="VID_ID = ".$vid.", ";

	if (url::$date1 != '') {
		$s.="PERIOD_BEG = '".url::$date1."', ";
	} else {
		$s.="PERIOD_BEG = null, ";
	}

	if (url::$date2 != '') {
		$s.="PLAN_PERIOD_END = '".url::$date2."', ";
	} else {
		$s.="PLAN_PERIOD_END = null, ";
	}

	if (url::$date3 != '') {
		$s.="PERIOD_END = '".url::$date3."', ";
	} else {
		$s.="PERIOD_END = null, ";
	}

	$s.="POINT='[".$lat.",".$lon."]' ";
	$s.="where D\$UUID='".$id."' and USER_ID=".$userid." ";
	self::$query=$s;
	return $s;
}

public static function dragMark($userid,$id,$lat,$lon,$s="") {
	$s.="update bad_roads set POINT='[".$lat.",".$lon."]' where D\$UUID='".$id."' and USER_ID=".$userid." ";
	return $s;
}

public static function editStreet($street,$lat,$lon,$s="") {
	$s.="update bad_roads set STREET='".$street."' where POINT='[".$lat.",".$lon."]' ";
	self::$query=$s;
	return $s;
}


} ?>
