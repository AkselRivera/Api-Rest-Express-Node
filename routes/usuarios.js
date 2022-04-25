const express = require("express");
const Joi =require('@hapi/joi');

const rutas= express.Router();


let users=[{id:1, name:'grover'}, {id:2, name:'felix'}, {id:3, name:'Cuevas'}];


rutas.get('/', (req, res)=>{
    res.send(users);
});

rutas.get('/:id', (req, res)=>{
    const {id}= req.params;

    const user=existeUser(id);
    if(!user){
        res.status(404).send('Usuario no encontrado!');
        return;
    }
    else
        res.send(user);
});

rutas.post('/', (req,res)=>{


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

rutas.put('/:id',(req,res)=>{
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
rutas.delete('/:id',(req,res)=>{
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



function existeUser(id){
    return users.find(user => user.id === parseInt(id) );
}

function validarUsuario(name ){

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).required()    
    })
    
    return schema.validate({ name });
}


module.exports=rutas;