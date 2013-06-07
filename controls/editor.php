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
			if (isset($m[$i]->SAGENT)) {
				if ($m[$i]->SAGENT!='') {
					$j[] = toUTF($m[$i]->SAGENT);
				}
			}
		}
		return $j;
	}
	return false;
}


public static function createMark($j=array()) {
	if (signin::check()) {
		if ((isset(url::$lat)) and (isset(url::$lon)) and (isset(url::$userid)) and (isset(url::$vid))) {
			if (query(sql::getUUID(),$u)) {
				if (isset($u[0]->UUID)) {
					if (query(sql::addNewMark(url::$userid,$u[0]->UUID,url::$vid))) {
						if (query(sql::saveMark(url::$userid,$u[0]->UUID,url::$agent,url::$info,url::$lat,url::$lon,url::$vid))) {
							if (query(sql::getPointById($u[0]->UUID),$p)) {
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
	return false;
}


public static function removeMark($j=array()) {

	if (signin::check()) {
		if ((isset(url::$uuid)) and (isset(url::$userid))) {
			if (query(sql::removeMark(url::$userid,url::$uuid))) {
				return true;
			}			
		}
	}
	return false;
}


public static function saveMark($j=array()) {

	if (signin::check()) {
		if ((isset(url::$uuid)) and (isset(url::$userid)) and (isset(url::$agent)) and (isset(url::$lat)) and (isset(url::$lon)) and (isset(url::$vid))) {
			if (query(sql::saveMark(url::$userid,url::$uuid,url::$agent,url::$info,url::$lat,url::$lon,url::$vid))) {
				return true;
			}			
		}
	}
	return false;
}


public static function dragMark($j=array()) {

	if (signin::check()) {
		if ((isset(url::$uuid)) and (isset(url::$userid)) and (isset(url::$lat)) and (isset(url::$lon))) {
			if (query(sql::dragMark(url::$userid,url::$uuid,url::$lat,url::$lon))) {
				return true;
			}			
		}
	}
	return false;
}

public static function editStreet($j=array()) {
	if ((isset(url::$street)) and (isset(url::$lat)) and (isset(url::$lon))) {
		if (query(sql::editStreet(url::$street,url::$lat,url::$lon))) {
			return true;
		}			
	}
	return false;
}


} ?>
