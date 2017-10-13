<?php
	if(array_key_exists("id",$_GET)){
		$id=$_GET["id"];
	}else{
		$id=0;
	}
	$file = fopen("maps/map".$id.".txt", "r");
	$content = fread($file, filesize("maps/map".$id.".txt"));
	fclose($file);
	echo $content;
?>