const Joi = require("@hapi/joi");

function validarUsuario(name ){

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).required()    
    })
    
    return schema.validate({ name });
}

exports.module = validarUsuario;