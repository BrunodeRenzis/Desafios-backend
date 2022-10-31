const express = require('express');
const router = express.Router();
const controlador = require('../api/productos');

router.post('/productos', async (req, res) => {
    try {
        let producto = await controlador.guardar(req.body);
        res.send(producto);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/productos', async (req, res) => {
    try {
        let productos = await controlador.buscar(req.query);
        res.send(productos);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;