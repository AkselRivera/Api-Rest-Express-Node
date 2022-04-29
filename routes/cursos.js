const express = require("express");
const ruta= express.Router();
const { listarCursos, crearCurso, actualizarCurso, eliminarCurso } = require("../controllers/cursoController");
const verificarToken = require("../middleware/verificarToken");


ruta.get('/',listarCursos);
ruta.post('/', verificarToken, crearCurso);
ruta.put('/:id',actualizarCurso);
ruta.delete('/:id',eliminarCurso);


module.exports= ruta;