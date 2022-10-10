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
    {nombre: "Pala", precio: 540},
    {nombre: "Pintura", precio:1200}
];

const mensajes = [
    {autor: "brunoderenzisrubinetti@hotmail.com", mensaje:"Que ondaaaa?"},
    {autor: "maurobarrera@hotmail.com", mensaje:"Tenés comida?"}
];

io.on('connection',(socket)=>{
    console.log("Nuevo cliente conectado");
    socket.emit('mensajes',mensajes);
    socket.emit('productos',productos);
    socket.on('nuevo-mensaje',mensaje=>{
        mensajes.push(mensaje);
        io.sockets.emit('mensajes',mensajes); //No emite solo en este socket si no que comunica a todos los sockets que estén conectados utilizando el método connect de io
        contenedorMensajes.save(mensajes);  
    })
    socket.on('nuevo-producto',producto=>{
        productos.push(producto);
        io.sockets.emit('productos',productos); //No emite solo en este socket si no que comunica a todos los sockets que estén conectados utilizando el método connect de io
        contenedorProductos.save(productos);
    })
})

const PORT = 8080;
httpServer.listen(PORT,()=>console.log("SERVER ON")).on('error',error=>console.log(`Error en el servidor ${error}`));
