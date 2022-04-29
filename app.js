const express = require("express");
const morgan = require("morgan");

const usuarios = require("./routes/usuarios");
const cursos = require("./routes/cursos");
const { dbConnection } = require("./database/config");
const auth = require("./auth/auth");


const app = express();

// const logger= require('./middleware/logger');



//Permite recibir requerimentos tipo JSON (POST)
app.use(express.json());
// Middleware para recibir datos de formularios (POST)
app.use(express.urlencoded({extended:true}));
// Middleware para publicar recursos estaticos
app.use(express.static('public'));

// Middleware Rutas para el control y mantenimineto de la aplicación
app.use('/api/usuarios',usuarios);
app.use('/api/cursos',cursos);
app.use('/api/auth',auth);

// Configuracion de entonros
// console.log('Aplicacion: ' + config.get('nombre') );
// console.log('DB: ', config.get('configDB.host'));


// Uso de middleware de tercero
app.use(morgan('tiny'));

// Middleware creado
// app.use(logger);


app.get('/', (req,res)=>{
    res.send('Hola mundo enviado desde Express');
});

dbConnection();

const port= process.env.PORT || 3000;
app.listen(port, () =>{
    console.log('Servidor corriendo en el puerto: ',port);
})


