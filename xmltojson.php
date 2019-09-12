<?php

function XMLtoJSON($xml) {
	$xmlcontent = file_get_contents($xml);
	$xmlcontent = str_replace(array("\n","\r","\t"), '',$xmlcontent);
	$xmlcontent = trim(str_replace('"',"'",$xmlcontent));
	$simplexml = simplexml_load_string($xmlcontent);
	return json_encode($simplexml);
}

function searchxml($pathdb) {
	$c = 0;
	$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($pathdb));

	foreach ($files as $f) {
    		if ( !$f->isDir() ) {
    			//echo $f->getPath()." - ".$f->getFilename()."\n";
			//echo $f->getPath()."/".$f->getFilename()."\n";
			if ($f != '.' && $f != '..' && substr($f,-4)=='.xml') {
				$c = $c+1;
				$fname = $f->getFilename();
				$fname = substr($fname,0,-4); // quito extension .xml
				$fjson = fopen("filesjson/".$fname.".json","w");
				fputs($fjson,XMLtoJSON($f));
				fclose($fjson);
			}
		}
    	}
	return "Archivos XML convertidos: ".$c;
}

$path = 'archetypes/';

echo searchxml($path);

echo "\n";

?>
