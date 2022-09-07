class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    
    getFullName(){
        return `${this.apellido}, ${this.nombre}`;        
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre,autor){
        let book = {name:nombre,autor:autor}
        this.libros.push(book);
    }

    getBookNames(){
        let arrayNombresLibros = [];
        this.libros.forEach(libro => {
            arrayNombresLibros.push(libro.name);
        });
        return arrayNombresLibros;
    }
}

const usuarioNuevo = new Usuario("Bruno","de Renzis",[{name:'Tren nocturno a Lisboa',autor:'Peter Bieri'}],[{name:"Mikasa",tipo:"Gato"},{name:"Div",tipo:"Gato"}]);

console.log(usuarioNuevo.getFullName());
console.log(usuarioNuevo.countMascotas());
usuarioNuevo.addMascota({name:"Luna",tipo:"Perro"});
console.log(usuarioNuevo.countMascotas());
console.log(usuarioNuevo.getBookNames());
usuarioNuevo.addBook("El psicoanalista","John Katzenbach");
console.log(usuarioNuevo.getBookNames());


