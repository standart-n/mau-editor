<?php class editor extends sn {
	
public static $type;
public static $status;

function __construct() {
	
}

public static function getPoints($j=array()) {

	if (query(sql::getPoints(),$m)) {
		for ($i=0;$i<sizeof($m);$i++) {
			foreach ($m[$i] as $key => $value) {
				$j[$i][$key] = toUTF($value);
			}		
		}
		return $j;
	}
	return false;
}

public static function getBalloonContent($j=array()) {

	if (query(sql::getBalloonContent(),$m)) {
		for ($i=0;$i<sizeof($m);$i++) {
			foreach ($m[$i] as $key => $value) {
				$j[$i][$key] = toUTF($value);
			}		
		}
		return $j[0];
	}
	return false;
}



} ?>
