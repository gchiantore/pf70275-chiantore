# Proyecto Final - BackEnd 1

## Concidaraciones Generales para usar el proyecto
El Proyecto se pude utilizar de dos maneras, una visual a travez de las rutas /views o de manera programatica a travez de las rutas /apí, esta ultima se puede usar desde un front o bien en el caso de las solicitudes get desde la barra de direcciones del navegador o para los put, post y delete se puede usar postman. 

antes de usar el proyacto, se debera descargar el mismo, posicionarse en la carpeta y levantar el servidor con el siguiente comando en la sonsola :

```
node --watch src/app.js

```
una vez levantado el servidor este mostrara en la consola lo sigiente 

```
Servicio socket.io activo
Server activo en puerto 8080 conectado a la base de datos mongodb://localhost:27017/coder70275
```
esto indica que todo esta listo para ejecutar, luego deberiamos abrir un navegador o postman y comenzar a probarlo, de la manera que quede mas comoda.

### Uso del proyecto de manera visual 

Para usar el proyecto de esta manera debemos abrir un navegador y tipear la siguiente ruta en la barra de direcciones 

```
http://localhost:8080/views/index
```
se cargara una pagina web con las opciones para poder realizar todas las operaciones que realiza el BackEnd

#### Crear un Producto 
Lleva a una pagina con un formulario que permite crear el producto haciendo una llamada POST a la ruta api/product 

#### Crear un Usuario 
De la misma manera que se crea un producto se crea un usuario 

#### Setear un Carrito
Aqui hay algunas cosas a conciderar, para poder cargar productos en un carrito, es necesario tener un carrito activo, esta es la manera que encontre para solucionar ese problema, al entrar en esta opcion muestra todos los carritos disponibles para que elijamos con el que queremos trabajar, una vez elegido este estara presente durante toda la ejecucion de la app a menos que elijamos otro. Pero en caso de que no querramos trabajar con ninguno de la lista, podemos crearnos uno, y esta ademas de crearse se setara por defecto para que trabajemos con el hasta que salgamos o elijamos otro. 

#### Ver lista de Productos 
Aqui vamos a ver una lista de productos paginada, ordenada y filtrada de acuerdo a los query params que pongamos en la barra de direcciones, la configuracion por defecto es la siguiente 
```
http://localhost:8080/views/products/
```
aqui va a mostrar todos los productos, sin orden, paginados de a 10, empezando por la pagina 1.

```
http://localhost:8080/views/products?pg=1&limit=5&sort=des&filter={"category":"kitesurf"}
```
aqui vemos que podemos obtener la lsita de todos los productos de la categoria kitesurf, ordenados por precio en forma descendente y paginados de a 5, empezando por la pagina 1 

tambien podemos movernos hacia la progima pagina y volver a la anterior con los botones celestes abajo de la lista 

cada item tiene un boton para agregarlo al carrito, al hacer clic se va a agregar al carrito setado o si ya existe va a sumar la cantidad en 1 

por ultimo siempre en todas las paginas hay un boton negro que nos vulve al views/index

#### Ver Contenido de carrito
Esta vista nos muestra el contenido del carrito seteado, permite a demas borrar un item determinado del carrito o bien vaciarlo

Con esta forma visual podemos probar todas las funcionalidades del BackEnd.

### Uso del proyecto de manera programatica 

Aqui vamos a usar el proyecto a travez de los end points, esto es util para usarlo desde un front o para pobarlo desde PostMan o Thunder Client por ejemplo.

Vamos a enumerar los enpoints y la ayuda para usarlos 

como se puede apreciar cada seccion o coleccion tiene una ruta base, las mismas son 

```
api/users

api/products

api/carts

```
##### Usuarios
para la ruta de usuarios podemos crear un usuario con lo siguiente 
```
Metodo : POST
Direccion: localhost:8080/api/users

JSON

{
  "firstName":"Juan Pablo",
  "lastName":"Chiantore",
  "email":"jchiantore@oscarchiantore.com.ar"
  }

```
Podemos Modificar un atributo o todos del usuario 

```
Metodo : PUT
Direccion: localhost:8080/api/users/672131191139853a148a6972

JSON

{
  "firstName":"Pablo",
  "lastName":"Chiantore",
  "email":"jp@oscarchiantore.com.ar"
  }

```
podemos eliminar un usuario 

```
Metodo : DELETE
Direccion: localhost:8080/api/users/672131191139853a148a6972
```

Tambien podemos obtener todos los usuarios mediante 

```
Metodo : GET
Direccion: localhost:8080/api/users
```

##### Productos 

Para el caso de los productos es muy similar en cuanto al PUT, DELETE, y POST, en cuanto a al GET hay algunos cambios 

con la siguiente ruta podemos agregar un producto

```
Metodo : POST
Direccion: localhost:8080/api/products

JSON

{
  "title":"F-ONE Bandit 19",
  "description":"Easy Ride Kite",
  "code":"11674yt2AAPDF",
  "price":272,
  "status":true,
  "stock":30,
  "category":"kitesurf"
}

```
Podemos Modificar un atributo o todos del Producto

```
Metodo : PUT
Direccion: localhost:8080/api/products/6724e891ba0a420006254d84

JSON

{
  "title":"F-ONE Bandit 19",
  "description":"Easy Ride Kite",
  "code":"11674yt2AAPDF",
  "price":272,
  "status":true,
  "stock":30,
  "category":"kitesurf"
}

```
podemos eliminar un usuario 

```
Metodo : DELETE
Direccion: localhost:8080/api/products/6724e891ba0a420006254d84
```
y para obtener los usuarios usamos GET, con query params, los que acepta son :

* pg -> numero de pagina en donde inicia el paginado
* limit -> cantidad de registros por pagina
* sort -> puedes ser asc o des, si esta presente ordena los productos por precio
* filter -> {"atributo"="valor"}, se puede filtrar por culaquier atributo, solo hay que pasar el nombre del atributo y el valor que deseamos que tenga entre comillas encerrados con llaves se puede filtrar por mas de uno de la siguiente manera {"atributo1"="valor",
"atributo2"="valor"}

Ejemplos:

```
Metodo : GET

localhost:8080/api/products
```

devuelve una lista con todos los productos, pagiandos de a 10, comenzando por la pagina 1, sin orden y sin filtro
```
localhost:8080/api/products?pg=3
```
devuelve una lista con todos los productos paginados de a 10 comenzando por la pagina 3 sin orden ni filtro
```
localhost:8080/api/products?pg=3&limit=5
```
devuelve una lista con todos los productos paginados de a 5 comenzando por la pagina 3 sin orden ni filtro
```
localhost:8080/api/products?pg=3&limit=5&sort=asc
```
devuelve una lista con todos los productos paginados de a 5 comenzando por la pagina 3 ordenados por precio en forma ascendente y sin filtro

```
localhost:8080/api/products?pg=3&limit=5&sort=asc&filter={"category":"kitesurf"}
```

devuelve una lista productos paginados de a 5 comenzando por la pagina 3 ordenados por precio en forma ascendente, y de la categoria kitesurf

##### Cart

Aqui la cosa es especial porque al crear un carrito este solo debe tener el id y un array vacio de productos con el id del producto y y la cantidad, los endpoint se comportan de una manera un poco diferente de los demas con respecto al crud

analicemos el get

Aqui obtendremos todos los productos de un carrito dado en el req.params, en el caso del ejemplo obtendremos los productos del carrito con id 67240f30ba0a420006254d7f

```
Metodo : GET
Direccion: localhost:8080/api/carts/67240f30ba0a420006254d7f
```

el metodo POST crea un carrito con un array de productos vacios por lo que no hace falta enviar ningun JSON 

```
Metodo : POST
Direccion: localhost:8080/api/carts
```

El metodo PUT tiene como objetivo modificar o agregar un producto al carrito, es decir si el producto enviado en el req.params existe en el carrito incrementa en 1 la cantidad, y si no existe, agrega dicho procuto con cantidad 1, un ejemplo seria el de abajo 

```
Metodo : PUT
Direccion: localhost:8080/api/carts/67240f30ba0a420006254d7f/products/6724e891ba0a420006254ddc
```

Por ultimo el metodo DELETE solo vacia el contenido del carrito, es decir deja vacio el aaray de productos. 

