const express = require('express');
const app = express();
const {Router} = express;
const routerApiProductos = Router();

app.use('/api/productos',routerApiProductos);
routerApiProductos.use(express.json());

const productos = [];

const findProductById = (id)=>{
    return productos.find(producto => producto.id==id);
}

routerApiProductos.get('', (req,res)=>{
    res.send({productos: productos});
})

routerApiProductos.get('/:id', (req,res)=>{
    const {id} = req.params;
    console.log(id);
    res.send({producto: findProductById(id)});
})

routerApiProductos.post('', (req,res)=>{
    const {producto} = req.body;
    console.log(producto);
    producto.id = productos.length+1;
    productos.push(producto);
    res.send({productoAgregado: producto});
})

routerApiProductos.put('/:id',(req,res)=>{
    const {id} = req.params;

    const {producto} = req.body;
    productos.splice(productos[parseInt(id)-1],1,producto);
    
    res.send({productoModificado: producto});
})

routerApiProductos.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const producto = productos.splice(parseInt(id-1),1);
    res.send({borrado:producto});
})



const PORT = process.env.port || 8080;
const server = app.listen(PORT,()=>{console.log('server runing')});
server.on('error',error=>console.log(`Error ${error}`));