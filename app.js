const express = require("express");
const config = require('config');
const morgan = require("morgan");
const Joi =require('@hapi/joi');
const app = express();

// const logger= require('./middleware/logger');




//Permite recibir requerimentos tipo JSON (POST)
app.use(express.json());
// Middleware para recibir datos de formularios (POST)
app.use(express.urlencoded({extended:true}));
// Middleware para publicar recursos estaticos
app.use(express.static('public'));

// Configuracion de entonros
console.log('Aplicacion: ' + config.get('nombre') );
console.log('DB: ', config.get('configDB.host'));


// Uso de middleware de tercero
app.use(morgan('tiny'));

// Middleware creado
// app.use(logger);


let users=[{id:1, name:'grover'}, {id:2, name:'felix'}, {id:3, name:'Cuevas'}];

app.get('/', (req,res)=>{
    res.send('Hola mundix');
});

app.get('/api/usuarios', (req, res)=>{
    res.send(users);
});

app.get('/api/usuarios/:id', (req, res)=>{
    const {id}= req.params;

    const user=existeUser(id);
    if(!user){
        res.status(404).send('Usuario no encontrado!');
        return;
    }
    else
        res.send(user);
});

app.post('/api/usuarios/', (req,res)=>{


    const {error, value}= validarUsuario( req.body.name );
    // schema.validate({ name:req.body.name });


    if(!error){

        const user={
            id: users.length+1,
            name: value.name
        }

        users.push(user);

        res.status(201).json({
            message:'Usuario agregado',
            data:user
        });
    }
    else{
        const message= error.details[0].message;
        res.status(400).send(message);
        return;
    }
});

app.put('/api/usuarios/:id',(req,res)=>{
    const {id}= req.params;

    const user=existeUser(id);
    if(!user){
        res.status(404).send('Usuario no encontrado!');
        return;
    }

    const {error, value}= validarUsuario( req.body.name );

            if(error){
                const message= error.details[0].message;
                res.status(400).send(message);
                return;
            }

            user.name= value.name;
            res.send(user)
    
    
});
app.delete('/api/usuarios/:id',(req,res)=>{
    const {id}= req.params;
    const user=existeUser(id);
    if(!user){
        res.status(404).send('Usuario no encontrado!');
        return;
    }
    else{
        users.splice(id-1,1);
        res.json({
            message:'Se borro con exito',
            data:user
        });
    }
});

const port= process.env.PORT || 3000;
app.listen(port, () =>{
    console.log('Servidor corriendo en el puerto: ',port);
})




function existeUser(id){
    return users.find(user => user.id === parseInt(id) );
}

function validarUsuario(name ){

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).required()    
    })
    
    return schema.validate({ name });
}