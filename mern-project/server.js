const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
//Puerto en el que levam¿ntamos la app
const PORT = process.env.PORT || 3500


app.use(logger)

app.use(cors())

app.use(express.json())

//sirve para almacenar las cookies
app.use(cookieParser())



//npm run dev -> nuestro script del packege j-son levantara el servidor

//el use sirve para accedr a esos archis estaticos para que el servidor los encuentre
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))



//logica para enviar el error de que no se enontro el recurso
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not Found"})
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

//app.listen => indica donde se va ea escuchar el puerto
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))