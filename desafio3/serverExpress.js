const express = require('express');
const app = express();
const fs = require('fs');
const random = require('random');
class Contenedor{
    constructor(file){
        this.file = file;
    }
    async save(producto){
        let productosObj = await this.getAll();
        productosObj.push(producto);
        await fs.promises.writeFile(this.file,JSON.stringify(productosObj));
    }
    async getAll(){
        let productos = await fs.promises.readFile(this.file);
        let productosObj = JSON.parse(productos);
        return productosObj;
    }

    async getById(id){
        let productos = await this.getAll();
        let productoRetornado = await productos.find((prod)=>prod.id==id);
        console.log(productoRetornado);
        return productoRetornado;
    }

    async deleteById(id){
        let productos = await this.getAll();
        let nuevaListaProductos = productos.filter((prod)=>prod.id!==id);
        console.log(nuevaListaProductos);
        await fs.promises.writeFile(this.file,JSON.stringify(nuevaListaProductos));
    }
    async deleteAll(){
        await fs.promises.writeFile(this.file,'[]');
    }


}

let contenedor = new Contenedor('productos.txt');

let resultadoProductos = async ()=>{ 
    let productos = await contenedor.getAll();
    return productos;
}

let resultadoProductoRandom = async(id)=>{
    let productoRandom = await contenedor.getById(id);
    return productoRandom;
}

app.get('/', (req, res) => {
    res.send(`Root`);
})

app.get('/productos', async (req, res) => {
    res.send(`La lista de productos es: ${JSON.stringify(await resultadoProductos())}`);
})

app.get('/productoRandom', async (req, res) => {
    res.send(`El producto es: ${JSON.stringify(await resultadoProductoRandom(Math.floor(Math.random()*3)))}`);
})


const PORT = process.env.port || 8080;
const server = app.listen(PORT,()=>{console.log('server runing')});
server.on('error',error=>console.log(`Error ${error}`));