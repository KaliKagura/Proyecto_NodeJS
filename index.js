// Es como realizar un import, aquí añadimos o incorporamos el archivo
// de la conexión creada a la base de datos.
// También importamos el modulo del servidor express y el cors para llamadas
// http de origenes cruzados o diferentes.
const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // form-urlencoded
//app.set('view engine', 'pug');

// RUTAS
const rutas_articulo = require("./rutas/articulo");

// Cargo las rutas
app.use("/api", rutas_articulo);

// Rutas prueba con datos en duro
app.get("/probando", (req, res) => {

    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json([{
        curso: "Desarrollo Web y Móvil",
        autor: "Alvaro Sanchez",
        url: "alvarosanchez73.com/react-node-express"
    },
    {
        curso: "Portafolio de Proyectos",
        autor: "Alvaro Sanchez",
        url: "alvarosanchez73.com/portafolio"
    },
    ]);

});

/*app.get("/motor", (req, res) => {


    return res.render("motor", {
        id: 1,
        nombre: "Alvaro Sanchez",
        web: "alvarosanchez.com"
    })

});
*/
app.get("/", (req, res) => {


    return res.status(200).send(
        "<h1>Empezando a crear un api rest con node</h1>"
    );

});


// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});



