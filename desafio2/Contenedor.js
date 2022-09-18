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
        let productoRetornado = productos.find((prod)=>prod.id==id);
        console.log(productoRetornado);
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

let prueba = new Contenedor('productos.txt');
//prueba.save({name:"Bruno",id:2});
prueba.deleteAll();
