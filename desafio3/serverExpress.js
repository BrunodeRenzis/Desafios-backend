const express = require('express');
const app = express();
const fs = require('fs');
const random = require('random');

const Contenedor = require ('../desafio2/Contenedor');

let contenedor = new Contenedor('productos.txt');

const getProductos = async ()=>{
    listaProductos = JSON.stringify(await contenedor.getAll());
    return listaProductos;
}

const getProductoRandom = async (min,max)=>{
    let id = Math.floor(Math.random()*(max-min)+min)
    let productoRandom = JSON.stringify(await contenedor.getById(id));
    return productoRandom;
}



app.get('/', (req, res) => {
    res.send(`Root`);
})

app.get('/productos',async (req, res) => {
    res.send(`La lista de productos es: ${await getProductos().catch("No se ha podido obtener la lista")}`);
})

app.get('/productoRandom',async (req, res) => {
    res.send(`El producto es: ${await getProductoRandom(1,await contenedor.getLength()).catch("No se ha podido obtener el producto")}`);
})


const PORT = process.env.port || 8080;
const server = app.listen(PORT,()=>{console.log('server runing')});
server.on('error',error=>console.log(`Error ${error}`));