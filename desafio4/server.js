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

const addProduct = (req,res)=>{
    const {producto} = req.body;
    producto.id = productos.length+1;
    productos.push(producto);
    res.send({productoAgregado: producto});
}

const getProducts = (req,res)=>{
    const {id} = req.params;
    res.send({producto: findProductById(id)});
}

const modifyProduct = (req,res)=>{
    const {id} = req.params;
    const {producto} = req.body;
    producto.id = id;
    console.log(producto);
    console.log("Indice del producto: ", productos[id-1]);
    productos.splice(parseInt(id-1),1,producto);
    res.send({productoModificado: producto});
}

const deleteProduct = (req,res)=>{
    const {id} = req.params;
    const producto = productos.splice(parseInt(id-1),1);
    res.send({borrado:producto});
}

routerApiProductos.get('', (req,res)=>{
    res.send({productos: productos});
})

routerApiProductos.get('/:id', (req,res)=>{
    getProducts(req,res);
})

routerApiProductos.post('', (req,res)=>{
    addProduct(req,res);
})

routerApiProductos.put('/:id',(req,res)=>{
    modifyProduct(req,res);
})

routerApiProductos.delete('/:id',(req,res)=>{
    deleteProduct(req,res);
})



const PORT = process.env.port || 8080;
const server = app.listen(PORT,()=>{console.log('server runing')});
server.on('error',error=>console.log(`Error ${error}`));