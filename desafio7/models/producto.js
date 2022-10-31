const knex = require('../database/knex');

class Producto {

    constructor() { }

    async guardar(producto) {
        try {
            let resultado = await knex('productos').insert(producto);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async buscar(condicion) {
        try {
            let productos = await knex('productos').where(condicion);
            return productos;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Producto();