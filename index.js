var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Puntuacion = require('./models/puntuacion')

var app = express();

//Preparo body parser para que transforme las peticiones de texto a json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', (req,res)=>{
    res.status(200).send("Hola Pablo");
})


//TODO: Refactorizar el codigo
//TODO: Usar rutas
//TODO: Async await


app.get('/puntuacion/:id', (req,res)=>{
    let puntuacionId = req.params.id;
    Puntuacion.findById(puntuacionId).exec( (err, puntuacion)=>{
        if(err){
            res.status(500).send({accion:'get one', mensaje:'error al obtener la puntuacion'})
        }else{
            res.status(200).send({accion:'get one', datos: puntuacion})
        }
    })
    
})

app.post('/puntuacion/', (req,res)=>{
    var datos = req.body;
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

    
})



app.delete('/puntuacion/:id',(req,res)=>{
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndDelete(puntuacionId, (err, puntuacionBorrada)=>{
        if(err){
            res.status(500).send({accion:'delete', mensaje: 'Error al borrar la puntuacion'})
        }else if(!puntuacionBorrada){
            res.status(404).send({accion:'delete', mensaje: 'Error el id a borrar no existe'})
        }
        else{
            res.status(200).send({accion:'delete', datos: puntuacionBorrada})
        }
    })
    
})


app.put('/puntuacion/:id', (req,res)=>{
    var datos = req.body;
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndUpdate(puntuacionId, datos, (err, puntuacionActualizada)=>{
        if(err){
            res.status(500).send({accion:'update', mensaje: 'Error al modificar la puntuacion'})
        }else if(!puntuacionActualizada){
            res.status(404).send({accion:'update', mensaje: 'Error el id a actualizar no existe'})
        }else{
            res.status(200).send({accion:'update', datos: puntuacionActualizada})
        }
    })
})






//Nos conectamos a mongo dockerizado
mongoose.connect('mongodb://localhost:27018/scores', (err, res)=>{
    if(err){
        console.log('Error al conectarme a la base de datos')
        throw err
    }else{
        console.log('Conexión correcta a mongoDB')
    }
});



app.listen(5200, ()=>{
    console.log("API REST funcionando en http://localhost:5200")
});