import os, shutil
import xmltodict, pprint, json

#funcion que lista archivos XML dentro de un directorio
def listarXML(path):
	print path
	lstArchivos = []
	lstDirectorios = os.walk(path) #lista directorios y ficheros
	#crea lista de ficheros extension .xml
	for root, dirs, files in lstDirectorios:
		for fichero in files:
			print os.path.abspath(ruta+fichero)
			(nombreFichero,extension) = os.path.splitext(fichero)
			if(extension == '.xml'):
				lstArchivos.append(nombreFichero+extension)
	return lstArchivos
#return len(lstArchivos)

def XMLtoJSON(fxml):
	with open(fxml) as fd:
		doc = xmltodict.parse(fd.read())
	pp = pprint.PrettyPrinter(indent=4)
	return json.dumps(doc)

ruta = '/home/rafael/Escritorio/archetypes/'
archivosxml = listarXML(ruta)

#for f in archivosxml:
	#archivo = open(f,'r')
	#print archivo.read()

#filesxml = listarXML(ruta)
#for file in filesxml:
	#ab = os.path.abspath(file)
	#print XMLtoJSON(ab)

#print listarXML(ruta)

#lstJSON = []
#filesxml = listarXML(ruta)
#for file in filesxml:
	#fileJSON = XMLtoJSON(file)
	#print fileJSON
	#fileJSON.append(lstJSON)
#print len(lstJSON)
