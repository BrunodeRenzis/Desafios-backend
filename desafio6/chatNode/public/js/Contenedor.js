const fs = require('fs');

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

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }


}

module.exports = Contenedor;