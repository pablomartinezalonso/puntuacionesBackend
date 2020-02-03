var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Preparo body parser para que transforme las peticiones de texto a json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', (req,res)=>{
    res.status(200).send("Hola Pablo");
})

app.get('/puntuaciones', (req,res)=>{
    //TODO: leer la base de datos select
    let datosJSON = {
        accion:'get all',
        datos: [
            {nombre:'pepe', puntuacion:33},
            {nombre:'bea', puntuacion:23},
            {nombre:'felix', puntuacion:29}
        ]
    }
    res.status(200).send(datosJSON);
})

app.post('/puntuacion/', (req,res)=>{
    var datos = req.body;
    //TODO: Insertar en la base de datos insert
    let datosJsonRespuesta={
        accion:'save',
        datos: datos
    }
    res.status(200).send(datosJsonRespuesta)
})



app.delete('/puntuacion/:id',(req,res)=>{
    let puntuacionId = req.params.id;
    let datosJsonRespuesta = {
        accion: 'delete',
        datos: puntuacionId
    }
    //TODO: borrar la base de datos el id
    res.status(200).send(datosJsonRespuesta)
})


app.listen(5200, ()=>{
    console.log("API REST funcionando en http://localhost:5200")
})

