const express = require('express');
const ApiClass = require ('./public/js/ApiClass.js');
const app = express();
const {Router} = express;
const routerApiProductos = Router();

app.use('/api/productos',routerApiProductos);

routerApiProductos.use(express.json());
routerApiProductos.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

const productos = [];

let api = new ApiClass(productos);

routerApiProductos.get('', (req,res)=>{
    res.send({productos: productos});
})

routerApiProductos.post('', (req,res)=>{
    api.addProduct(req,res);
})

routerApiProductos.get('/:id', (req,res)=>{
    api.getProduct(req,res);
})

routerApiProductos.put('/:id',(req,res)=>{
    api.modifyProduct(req,res);
})

routerApiProductos.delete('/:id',(req,res)=>{
    api.deleteProduct(req,res);
})

const PORT = process.env.port || 8080;
const server = app.listen(PORT,()=>{console.log('server runing')});
server.on('error',error=>console.log(`Error ${error}`));