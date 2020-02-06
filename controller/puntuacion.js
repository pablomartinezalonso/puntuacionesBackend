
var Puntuacion = require('../models/puntuacion')

async function getAll(req,res){
    /*Puntuacion.find().exec( (err, puntuaciones)=>{
        if(err){
            res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuacion'})
        }else{
            res.status(200).send({accion:'get all', datos: puntuaciones})
        }
    })*/
    //Promesas
    /*
    Puntuacion.find().exec()
        .then ( puntuaciones=> res.status(200).send({accion:'get all', datos: puntuaciones}) )
        .catch( err=> res.status(500).send({accion:'get all', mensaje:`error al obtener la puntuacion ${err}`}) )
    */
   //async await
    try{
        let puntuaciones = await Puntuacion.find()
        res.status(200).send({accion:'get all', datos: puntuaciones})
    }catch(err){
        res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuacion'})
    }


    
}
async function getById(req,res){
    /*let puntuacionId = req.params.id;
    Puntuacion.findById(puntuacionId).exec( (err, puntuacion)=>{
        if(err){
            res.status(500).send({accion:'get one', mensaje:'error al obtener la puntuacion'})
        }else{
            res.status(200).send({accion:'get one', datos: puntuacion})
        }
    })*/

    try{
        let puntuacionId = req.params.id;
        let puntuacion = await Puntuacion.findById(puntuacionId)
        res.status(200).send({accion:'get one', datos: puntuacion})
    }catch(err){
        res.status(500).send({accion:'get one', mensaje:'error al obtener la puntuacion'})
    }
    
}

async function insert(req,res){
    /*var datos = req.body;
    //TODO: Insertar en la base de datos insert
    var puntuacion = new Puntuacion();
    puntuacion.nombre = datos.nombre;
    puntuacion.puntuacion = datos.puntuacion;
    puntuacion.save( (err, puntuacionGuardada)=>{
        if(err){
            res.status(500).send({accion:'save', mensaje: 'Error al guardar la puntuacion'})
        }else{
            res.status(200).send({accion:'save', datos: puntuacionGuardada})
        }
    })
    */
    
    try{
        var puntuacion = new Puntuacion(req.body);
        let puntuacionGuardada = await puntuacion.save()
        res.status(200).send({accion:'save', datos: puntuacionGuardada})
    }catch(err){
        res.status(500).send({accion:'save', mensaje: 'Error al guardar la puntuacion'})
    }

}

async function remove(req,res){
    /*let puntuacionId = req.params.id;
    Puntuacion.findByIdAndDelete(puntuacionId, (err, puntuacionBorrada)=>{
        if(err){
            res.status(500).send({accion:'delete', mensaje: 'Error al borrar la puntuacion'})
        }else if(!puntuacionBorrada){
            res.status(404).send({accion:'delete', mensaje: 'Error el id a borrar no existe'})
        }
        else{
            res.status(200).send({accion:'delete', datos: puntuacionBorrada})
        }
    })*/
    
    try{
        let puntuacionId = req.params.id;
        let puntuacionBorrada = await Puntuacion.findByIdAndDelete(puntuacionId)
        if(!puntuacionBorrada){
            return res.status(404).send({accion:'delete', mensaje: 'Error el id a borrar no existe'})
        }
        res.status(200).send({accion:'delete', datos: puntuacionBorrada})
    }catch(err){
        res.status(500).send({accion:'delete', mensaje: 'Error al borrar la puntuacion'})
    }

}

async function update(req,res){
    /*var datos = req.body;
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndUpdate(puntuacionId, datos, (err, puntuacionActualizada)=>{
        if(err){
            res.status(500).send({accion:'update', mensaje: 'Error al modificar la puntuacion'})
        }else if(!puntuacionActualizada){
            res.status(404).send({accion:'update', mensaje: 'Error el id a actualizar no existe'})
        }else{
            res.status(200).send({accion:'update', datos: puntuacionActualizada})
        }
    })*/

    try{
        var datos = req.body;
        let puntuacionId = req.params.id;
        let puntuacionActualizada = await Puntuacion.findByIdAndUpdate(puntuacionId, datos)
        if(!puntuacionActualizada){
            return res.status(404).send({accion:'update', mensaje: 'Error el id a actualizar no existe'})
        }
        res.status(200).send({accion:'update', datos: puntuacionActualizada})
    }catch(err){
        res.status(500).send({accion:'update', mensaje: 'Error al modificar la puntuacion'})
    }
}

module.exports = {getAll,getById,insert,remove,update}