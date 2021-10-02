//Importo la libreria Express usando require
const express = require('express')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()
const router = require('./routes/index')
require('./config/database')
require('./config/passport')


//Creo el servidor/APP = ejecutando una instancia express usando create function
const app = express()

//Middleware 
//aplica  un filtro ante e que lleguen a las rutas, 
app.use(cors())
app.use(express.json())

//cuando te hagan un pedido de cualquier metodo cualquier ruta llama al router

app.use('/api', router)

// A app le digo ponete a escuchar en el puerto 4000 > una vez escuchando ejecutame esto
app.listen(4000, () => console.log('Server listening on port 4000'))