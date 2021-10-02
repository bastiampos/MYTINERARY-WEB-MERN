//Importo la libreria Express usando require
const express = require('express')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()
const router = require('./routes/index')
require('./config/database')
require('./config/passport')
const path = require('path')


//Creo el servidor/APP = ejecutando una instancia express usando create function
const app = express()

//Middleware 
//aplica  un filtro ante e que lleguen a las rutas, 
app.use(cors())
app.use(express.json())

//cuando te hagan un pedido de cualquier metodo cualquier ruta llama al router

app.use('/api', router)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname+'/client/build/index.html'))
    })
}

// A app le digo ponete a escuchar en el puerto 4000 > una vez escuchando ejecutame esto
app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening on port 4000'))