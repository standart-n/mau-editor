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

	if (query(sql::getBalloonContent(url::$uuid),$m)) {
		foreach ($m[0] as $key => $value) {
			$j[$key] = toUTF($value);
		}
		return $j;
	}
	return false;
}

public static function getAgents($j=array()) {
	if (query(sql::getAgents(),$m)) {
		for ($i=0;$i<sizeof($m);$i++) {
			foreach ($m[$i] as $key => $value) {
				$j[$i][$key] = toUTF($value);
			}
		}
		return $j;
	}
	return false;
}


public static function addNewMark($j=array()) {

	if (signin::check()) {
		if ((isset(url::$lat)) and (isset(url::$lon)) and (isset(url::$userid)) and (isset(url::$vid))) {
			if (query(sql::addNewMark(url::$userid,url::$vid))) {
				if (query(sql::getNewMark(),$m)) {
					if (isset($m[0])) {
						if (isset($m[0]->ID)) {
							if (query(sql::editNewMark($m[0]->ID,url::$lat,url::$lon))) {
								if (query(sql::getPointById($m[0]->ID),$p)) {
									foreach ($p[0] as $key => $value) {
										$j[$key] = toUTF($value);
									}
									return $j;
								}
							}
						}
					}
				}
			}
		}
	}
	return false;
}


public static function removeMark($j=array()) {

	if (signin::check()) {
		if ((isset(url::$uuid)) and (isset(url::$userid))) {
			if (query(sql::removeMark(url::$uuid))) {
				return true;
			}			
		}
	}
	return false;
}


public static function saveMark($j=array()) {

	if (signin::check()) {
		if ((isset(url::$uuid)) and (isset(url::$agent)) and (isset(url::$date1)) and (isset(url::$date2)) and (isset(url::$lat)) and (isset(url::$lon))) {
			if (query(sql::saveMark(url::$uuid,url::$agent,url::$info,url::$date1,url::$date2,url::$lat,url::$lon))) {
				return true;
			}			
		}
	}
	return false;
}


} ?>
