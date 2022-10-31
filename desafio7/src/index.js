const express = require('express');
const morgan = require('morgan');
const app = express();
const {Server : HttpServer} = require('http')
const {Server : IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
const productos = []
const mensajes = []

/* en caso de una excepcion no atrapada */
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(err);
});

/* configuro las rutas */
const mensajeRouter = require('../routes/mensajes.js');
app.use('/api', mensajeRouter);
const productoRouter = require("../routes/productos.js");
app.use('/api', productoRouter);

/* Conecto con socket */
io.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit('mensajes', mensajes);
    socket.emit('productos', productos);
    socket.on('nuevo-mensaje', mensaje=>{
        io.sockets.emit('mensajes', mensajes); 
        if(mensajes.length == 0){
            mensajes.push(mensaje);
            contenedorMensajes.save(mensajes);
        }
        else{
            mensajes.push(mensaje);
            contenedorMensajes.save(mensaje);  
        }
    })
    socket.on('nuevo-producto', producto => {
        io.sockets.emit('productos', productos); 
        if(productos.length == 0){
            productos.push(producto);
            contenedorProductos.save(productos);
        }
        else{
            productos.push(producto);
            contenedorProductos.save(producto);
        }
    })
})

/* obtengo el puerto del enviroment o de la configuracion de la app */
const puerto = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});