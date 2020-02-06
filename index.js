var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routerPuntuacion = require('./routers/puntuacion')
var cors = require('cors')
var morgan = require('morgan')
var dotenv = require('dotenv')

var app = express();
dotenv.config();


//Preparo body parser para que transforme las peticiones de texto a json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//TODO: existe un modulo npm install cors
// Configurar cabeceras y cors
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

app.use(cors())
app.use(morgan('dev'))
app.use('/puntuacion', routerPuntuacion)



//TODO: add usuarios (email, password, nombre) -> relaciones 1 a n
//TODO: login (jwt) + login con google, con facebook, ...
//TODO: Validaciones


//Nos conectamos a mongo dockerizado
/*mongoose.connect('mongodb://localhost:27018/scores', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true} , (err, res)=>{
    if(err){
        console.log('Error al conectarme a la base de datos')
        throw err
    }else{
        console.log('Conexión correcta a mongoDB')
    }
});*/
const run = async()=>{
    await mongoose.connect(process.env.URL_BASEDATOS, 
        {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    await app.listen(process.env.PUERTO_SERVIDOR)

    console.log('Servidor y base de datos arrancados')
}

run().catch(err=> console.err(`Fallo al arrancar ${err}`))





