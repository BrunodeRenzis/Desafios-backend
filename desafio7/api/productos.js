const Producto = require('../models/producto');

class ProductoController {

    constructor() { }

    async guardar(producto) {
        try {
            return await Producto.guardar(producto);
        } catch (error) {
            throw error;
        }
    }

    async buscar(condicion) {
        try {
            return await Producto.buscar(condicion);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductoController();