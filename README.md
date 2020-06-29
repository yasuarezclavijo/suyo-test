## Que se hizo?
En la carpeta chaticr, encontrara una aplicacion DJANGO, quien gracias a sus nuevas ventajas en la version 3.0 permite el uso de servidor ASGI lo que provee una capa intermedia en la comunicacion http, llevando a python al mundo de real time, y me permitio crear un canal web socket para el manejo del chat, encontrara unos templates base en donde se realizaron pruebas iniciales del funcionamiento, ademas de manejo de modelos para la tabla de guardar los mensajes en base de datos, por ahora funciona con la base de dato sql-lite la cual va adjunta con las pruebas realizadas en el repositoio.

Tambien hallara la carpeta frontend, en donde se hizo un rapido montaje rapido con parcel de una aplicacion en react js, donde se hizo una version rapida con dos componentes uno para captar nombre de usuario (Sin validacion realizada del mismo usuario) y una vez a traves de variables de estado se lleva al chat, se cargan los mensajes de las ultimas 10 horas, y permite la comunicacion de multiples usuarios. No se usaron rutas, ni redux, ni ninguna libreria adicional, el esfuerzo se centro en la clase capaz de establecer comunicacion con el web socket en django, listar y generar nuevos mensajes dentro del chat.

## Como levantar las instancias?
A nivel de desarrollo para python, necesitara establecer un virtual enviroment nuevo, una vez creado e iniciado sera cuestion de entrar a la carpeta chatirc y lanzar los siguientes comandos.
pip install -r requirements.txt (Esto instalara todas las dependencias necesarias)
python manage.py migrate (Esto migrara las configuraciones de los modelos a la base de datos)
python manage.py runserver (Levantara el servidor estandar en 127.0.0.1:8000 el mismo que esta configurado en el frontend para la comunicacion)

Para react, acceder al directorio frontend y ejecutar los siguientes comandos
npm install
npm run-script run
Estos instalaran dependencias y levantaran un servidor gracias a parcel en http://localhost:1234 y desde alli podra manipular la interfaz para el chat.

## Referencias
Tome y modifique el template de la siguiente URL
https://webdesignerwall.com/wdw-snippet/elegant-bootstrap-4-message-chat-box-template (Template)

## Comentarios

Sin importar el resultado GRACIAS, no saben lo mucho que puse en practica y aprendi realizando esta prueba, sere honesto nunca habia tenido la necesidad de montar un chat, habia leido sobre ASGI en Django, sobre nodeJs en fin ppero no habia tenido que ponerlo en practica, fue un reto, un muy bonito reto y por eso quise dejar este mensaje y agradecerles pues con solo esta prueba aprendi mucho y me senti muy a gusto haciendolo. Espero sea de su agrado y si no lo llega a ser, importante resaltar lo altamente agradecido por ser parte del proceso y por lo que aprendi, y podre  empezar a poner en practica en mis proyectos venideros.

Cordialmente

Yeison Suarez

# yac
Yet Another Chat


Must have the following features:
* login (could be just login by nickname or full signup process your choice)
* like IRC on one chat room
* can't be 2 people with same nickname
* chat room with the whole history
* an input to type messages
* message must be appended to the chat of all participants
* messages must show the sender and time


## Front end, use this stack:
* Javascript:
  * React
  * Redux
  * Sagas
  
* HTML/CSS material

## Backend, use this stack:
* Applicacion:  
  * Python - Bonus
  * Node
  * firebase or similar

## To apply for a job just...
* fork this repo
* create a PR with the URL to test try it.