const config = require("config");
const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");


const verificarToken = async(req, res=response, next)=>{

    let token= req.get('token');

    jsonwebtoken.verify(token, config.get('configToken.SEED'),(err,decoded)=>{
        if(err){
            return res.status(401).json({
                err
            });
        }
        // res.send(token);
        // Objeto USUARIO del JWT Creado en Auth
        req.usuario= decoded.usuario;
        next();
    })
    
    
}

module.exports= verificarToken;