const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
            name: {type: String, required: true},
            email: {type:String, required:true},
            password: {type: String, required:true},
            status: {type:Boolean, default:true},
            img: {type:String, required:false}
        });


        module.exports = mongoose.model('Usuario', usuarioSchema);
    