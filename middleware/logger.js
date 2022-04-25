
function log( req,res,next){

    console.log('Iniciando Middlewares');
    next();
}

module.exports= log;