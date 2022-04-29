const Usuario = require('../models/usuarioModel');
const { response } = require('express');
const bcrypt= require('bcrypt');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(5)
        .required(),
    email: Joi.string()
        .required()
})


const listarUsuarios = async (req, res=response )=>{

    try {
        let usuarios= await Usuario.find({'status':true})
                                    .select({name:1, email:1});
        res.status(200).json(usuarios);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok:false,
            message:'comuniquese con el amdinistrador'
        });
    }
}


const crearUsuario = async (req,res= response)=>{

    const {error}= schema.validate(req.body , {'abortEarly':false});
    if(error){
        res.status(400).json({message: error.details.map(e => e.message)});
        return;
    }
    let { email, password }= req.body;

    try{
        let usuario= await Usuario.findOne({email});
        
        if(usuario){
                return res.status(400).json({
                        ok:false,
                        message:'El usuario ya existe con ese correo'
                    });
        }
        password= bcrypt.hashSync(req.body.password,10);
        
        usuario=Usuario({...req.body, password} );
        
        await usuario.save();
        
        res.status(201).json({
            ok:true,
            message:'Usuario agregado',
            email,
            name: usuario.name,
        });
        
    } catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            message:'comuniquese con el amdinistrador'
        });
    }
}

const actualizarUsuario = async (req, res=response)=>{

    const {email}=req.params;
    try {
        let usuario= await Usuario.findOne({email});
        
        if(!usuario){
                return res.status(400).json({
                        ok:false,
                        message:'No existe usuario con ese correo'
                    });
        }

        const resultado = await Usuario.findOneAndUpdate(email,{
            $set: {
                name: req.body.name,
                password: req.body.password
            }
        },{new:true});

        res.status(201).json({
            ok:true,
            data:resultado,
        });

    } catch (e) {
        res.status(500).json({
            ok:false,
            message:'comuniquese con el amdinistrador'
        });
    }
}

const eliminarUsuario = async (req, res=response)=>{

    const {email}=req.params;
    try {
        let usuario= await Usuario.findOne({email});
        
        if(!usuario){
                return res.status(400).json({
                        ok:false,
                        msg:'No existe usuario con ese correo'
                    });
        }

        const resultado = await Usuario.findOneAndUpdate(email,{
            $set: {
                status:false
            }
        },{new:true});

        res.status(200).json({
            ok:true.name,
            message:'Registro eliminado',
            data:resultado,
        });

    } catch (e) {
        res.status(500).json({
            ok:false,
            msg:'comuniquese con el amdinistrador'
        });
    }
}

module.exports = {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}