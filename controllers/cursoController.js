const { response } = require("express");
const Curso = require("../models/cursoModel");
const Joi = require("@hapi/joi");

const schema= Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    author: Joi.string(),
    description: Joi.string(),
    students: Joi.number(),
    score: Joi.number()
})

const listarCursos= async (req, res= response)=>{
    const cursos= await Curso.find({'status':true})
                            .populate('author','name -_id');
    res.status(200).json(cursos);
}   

const crearCurso= async (req,res=response)=>{

    const {error}= schema.validate(req.body , {'abortEarly':false});
    if(error){
        res.status(400).json({message: error.details.map(e => e.message)});
        return;
    }

    try {
        let curso= Curso({...req.body, author:req.usuario._id});
        await curso.save();

        res.status(201).json({
            ok:true,
            message:'Curso agregado',
            curso,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'comuniquese con el amdinistrador'
        });
    }
}

const actualizarCurso= async(req, res=response)=>{
    let {id}= req.params;

    try {
        const curso = await Curso.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true});

        res.status(201).json(curso);
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:'comuniquese con el amdinistrador'
        });
    }

}

const eliminarCurso= async(req, res=response)=>{
    let {id}= req.params;

    try {
        const curso = await Curso.findByIdAndUpdate(id,{
            $set:{
                status:false
            }
        },{new:true});

        res.status(201).json(curso);
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:'comuniquese con el amdinistrador'
        });
    }

}

module.exports = {
    listarCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}


