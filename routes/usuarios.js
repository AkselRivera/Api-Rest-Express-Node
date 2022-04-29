const express = require("express");
const Joi =require('@hapi/joi');
const { crearUsuario, actualizarUsuario, eliminarUsuario, listarUsuarios } = require("../controllers/usuarioController");
const verificarToken = require("../middleware/verificarToken");

const rutas= express.Router();


rutas.get('/', verificarToken,listarUsuarios);
rutas.post('/', crearUsuario); 
rutas.put('/:email', verificarToken, actualizarUsuario); 
rutas.delete('/:email', verificarToken, eliminarUsuario); 



// rutas.get('/:id', (req, res)=>{
//     const {id}= req.params;

//     const user=existeUser(id);
//     if(!user){
//         res.status(404).send('Usuario no encontrado!');
//         return;
//     }
//     else
//         res.send(user);
// });


// });
// rutas.delete('/:id',(req,res)=>{
//     const {id}= req.params;
//     const user=existeUser(id);
//     if(!user){
//         res.status(404).send('Usuario no encontrado!');
//         return;
//     }
//     else{
//         users.splice(id-1,1);
//         res.json({
//             message:'Se borro con exito',
//             data:user
//         });
//     }
// });



// function existeUser(id){
//     return users.find(user => user.id === parseInt(id) );
// }

// function validarUsuario(name ){

//     const schema = Joi.object({
//         name: Joi.string().alphanum().min(3).required()    
//     })
    
//     return schema.validate({ name });
// }


module.exports=rutas;