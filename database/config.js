const mongoose = require('mongoose');

const dbConnection=async()=>{

    try{

        await mongoose.connect('mongodb+srv://mern_user:dNqbivMdvKBxhqsT@cluster0.migrn.mongodb.net/NodeExpress');
        console.log('DB online');


    }catch(e){
        console.log(e);
    }
}


module.exports={
    dbConnection
}


// mongoose.connect('mongodb+srv://mern_user:dNqbivMdvKBxhqsT@cluster0.migrn.mongodb.net/NodeExpress')
//     .then(()=> console.log('Conexion exitosa'))
//     .catch((err)=> console.log('Ocurrio un error', err));

//     const usuarioSchema = mongoose.Schema({
//         name: String,
//         lastName: String,
//         fecha: {type: Date, default: Date.now}
//     });

//     const Usuario = mongoose.model('Usuario', usuarioSchema);

//     async function guardarUsuario(){
//         const usuario= new Usuario({
//             name: 'Aksel',
//             lastName:'Crack',
//             fecha:'01/04/2001'
//         });
        
//         const res= await usuario.save();
//         console.log(res);
//     }

//     async function consultarUsuario(){
//         const usuarios= await Usuario.find();
//                                 // .find({name:'Aksel'}) actua Como un Where en SQL
//         console.log(usuarios);
//     }

//     async function actualizarUsuario(id){
//         const usuario= await Usuario.findById(id);
//         if(!usuario){
//             console.log('No se encontro el usuario');
//             return;
//         }

//         usuario.name='Mike';
//         const res = await usuario.save();
//         console.log(res);
//     }

//     async function elminarUsuario(id){
//         const res= await Usuario.deleteOne({_id:id});
//         console.log(res);
//     }

//     elminarUsuario('626977ae9f56a0a1c56e3ed5');