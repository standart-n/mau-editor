<?php
	const project="/var/ftp/user1/www/mauric.ru/_editor";
	const system="/var/ftp/user1/www/mauric.ru/_editor/sn-system";
	
	if (file_exists(system.'/core/sn.php')) {
		require_once(system.'/core/sn.php');
		$sn=new sn;
	} else {
		echo "error";
	}
?>
