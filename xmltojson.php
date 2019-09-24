<?php

// clase que transforma la estructura de datos u objeto a un formato que se pueda almacenar o transmitir

class JsonSerializer extends SimpleXmlElement implements JsonSerializable
{
	const ATTRIBUTE_INDEX = "@attr";
	const CONTENT_NAME = "_text";

	function jsonSerialize()
    	{
        	$array = [];

        	if ($this->count()) {
            		// serializa hijos de raiz si lo hay
               		foreach ($this as $tag => $child) {
                		$temp = $child->jsonSerialize();
                		$attributes = [];

                		foreach ($child->attributes() as $name => $value) {
                    			$attributes["$name"] = (string) $value;
                		}
                		$array[$tag][] = array_merge($temp, [self::ATTRIBUTE_INDEX => $attributes]);
            		}
		} else {
            		// serializa atributos y contenido de los elementos
            		$temp = (string) $this;

	            	// si es una cadena vacia, entonces es un elemento vacio
            		if (trim($temp) !== "") {
                		$array[self::CONTENT_NAME] = $temp;
            		}
        	}

        	if ($this->xpath('/*') == array($this)) {
	            	// se considera el elemento raiz
            		$array = [$this->getName() => $array];
        	}
        	return $array;
    	}
}

// recibe archivo xml, lo limpia, y serializa el contenido
function XMLtoJSON($xml) {
	$xmlcontent = file_get_contents($xml);
	$xmlcontent = str_replace(array("\n","\r","\t"), '',$xmlcontent);
	$xmlcontent = trim(str_replace('"',"'",$xmlcontent));
	$xml = new JsonSerializer($xmlcontent);
	return json_encode($xml,JSON_PRETTY_PRINT);
}

// busca archivos xml en una determinada ruta
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


?>
