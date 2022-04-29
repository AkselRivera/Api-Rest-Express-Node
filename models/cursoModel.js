const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
            name: {type: String, required: true},
            author:{
                type: mongoose.Schema.Types.ObjectId, ref:'Usuario'
            },
            description: {type:String, required:false},
            status: {type:Boolean, default:true},
            students: {type:Number, default:0},
            score: {type:Number, default:0},
            img: {type:String, required:false}
        });


        module.exports = mongoose.model('curso', cursoSchema);
    