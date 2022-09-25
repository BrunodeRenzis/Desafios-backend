class Api{
    constructor(productos){
        this.productos = productos
    }
    findProductById = (id)=>{
        return this.productos.find(producto => producto.id==id);
    }
    
    addProduct = (req,res)=>{
        const producto = req.body;
        producto.id = (this.productos.length+1);
        this.productos.push(producto);
        console.log(this.productos.length);
        res.json(producto);
    }
    
    getProduct = (req,res)=>{
        const {id} = req.params;
        this.findProductById(id) != null ? res.send({producto: this.findProductById(id)}) : res.send({error:"Producto no encontrado"});
    }
    
    modifyProduct = (req,res)=>{
        const {id} = req.params;
        const {producto} = req.body;
        producto.id = id;
        this.productos.splice(parseInt(id-1),1,producto);
        res.send({productoModificado: producto});
    }
    
    deleteProduct = (req,res)=>{
        const {id} = req.params;
        const producto = this.productos.splice(parseInt(id-1),1);
        res.send({borrado:producto});
    }
}

module.exports = Api;