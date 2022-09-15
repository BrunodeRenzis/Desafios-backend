const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    }
    async save(producto){
        let contenido = await this.getAll();
        let newId = 0;
        if(contenido.length>0){
            newId = contenido.length+1;
        } else{
            newId = 1;
        }
        producto.id = newId;
        contenido.push(producto);
        await fs.promises.writeFile(this.file,JSON.stringify(contenido)); 
    }
    async getAll(){
        let contenido = await fs.promises.readFile(this.file);
        let contenidoObj = JSON.parse(contenido);
        return contenidoObj;
    }

    async getById(id){
        let contenido = await this.getAll();
        let resultado = contenido.find(elem=>elem.id == id)
        return resultado;
    }

    async deleteById(id){
        let contenido = await this.getAll();
        let nuevoContenido = contenido.filter(elem => elem.id !== id);
        await fs.promises.writeFile(this.file,JSON.stringify(nuevoContenido));
    }
    async deleteAll(){
        let nuevoContenido = []
        await fs.promises.writeFile(this.file,JSON.stringify(nuevoContenido));
    }
}

let prueba = new Contenedor('productos.txt');
//prueba.save({nombre:"Zapatillaasdass",precio:15400});
// prueba.getById(1);
//prueba.deleteById(1);
prueba.deleteAll();