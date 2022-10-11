const express = require('express');
const app = express();
const Contenedor = require ('../../desafio2/Contenedor');

const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io');
const httpServer = new HttpServer(app);

app.use(express.static('./public'));

const contenedorMensajes = new Contenedor('chat.txt');
const contenedorProductos = new Contenedor('productos.txt');

const io = new IOServer(httpServer);
const productos = [
];

const mensajes = [
];

io.on('connection',(socket)=>{
    console.log("Nuevo cliente conectado");
    socket.emit('mensajes',mensajes);
    socket.emit('productos',productos);
    socket.on('nuevo-mensaje',mensaje=>{
        io.sockets.emit('mensajes',mensajes); //No emite solo en este socket si no que comunica a todos los sockets que estén conectados utilizando el método connect de io
        if(mensajes.length==0){
            mensajes.push(mensaje);
            contenedorMensajes.save(mensajes);
        }
        else{
            mensajes.push(mensaje);
            contenedorMensajes.save(mensaje);  
        }
    })
    socket.on('nuevo-producto',producto=>{
        io.sockets.emit('productos',productos); //No emite solo en este socket si no que comunica a todos los sockets que estén conectados utilizando el método connect de io
        if(productos.length==0){
            productos.push(producto);
            contenedorProductos.save(productos);
        }
        else{
            productos.push(producto);
            contenedorProductos.save(producto);
        }
    })
})

const PORT = 8080;
httpServer.listen(PORT,()=>console.log("SERVER ON")).on('error',error=>console.log(`Error en el servidor ${error}`));
