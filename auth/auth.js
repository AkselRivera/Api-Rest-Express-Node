const express = require("express");
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

const Usuario = require("../models/usuarioModel");


const ruta= express.Router();

ruta.post('/', (req,res)=>{
    Usuario.findOne({email: req.body.email})
        .then(datos=>{
            if(datos){
                const pass = bcrypt.compareSync(req.body.password, datos.password);
                if(!pass){
                    res.status(400).json({
                        ok:false,
                        message: "Usuario o contraseña incorrecta"
                    })
                    return;
                }
                // const jwt= jsonwebtoken.sign({_id: datos._id, name: datos.name, email:datos.email}, 'palabraSecreta');
                const jwt= jsonwebtoken.sign({
                    usuario:{_id: datos._id, name: datos.name, email:datos.email}
                }, config.get('configToken.SEED')  ,{expiresIn: config.get('configToken.expiracion') });
                res.json({
                    usuario:{
                        _id:datos._id,
                        name: datos.name,
                        email:datos.email
                    },
                    token:jwt
                });
            }else{
                res.status(400).json({
                    ok:false,
                    message: "Usuario o contraseña incorrecta"
                })
            }
        })
        .catch(e=>{
            res.status(404).json({
                ok:false,
                message: e
            })
        })
})


module.exports= ruta;
