<?php class start extends sn {
	
public static $response;

function __construct() {
	self::$response=array();
	if (self::getControls()) {
		if (self::getAction()) {
			echo self::getResponseString(json_encode(self::$response));
		}
	}	
}

function getAction() {
	if (isset(url::$action)) {
		self::$response=project::engine();
		return true;
	}
	return false;
}

function getControls() {
	require_once(project."/controls/project.php");
	require_once(project."/controls/url.php");
	require_once(project."/controls/sql.php");
	require_once(project."/controls/signin.php");
	require_once(project."/controls/editor.php");
	sn::cl("project");
	sn::cl("url");
	sn::cl("sql");
	sn::cl("signin");
	sn::cl("editor");

	return true;	
}


function getResponseString($s="") {
	if ($s) {
		if (isset(url::$callback)) {
			return url::$callback."(".$s.");";
		} else {
			return $s;
		}
	}
	return false;
}


} ?>
