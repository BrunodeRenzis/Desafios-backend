const express = require('express')
const router = express.Router()

const Contenedor = require('../controllers/script')
const contenedor = new Contenedor('productos2')

router.get("/", async (req, res) => {
    const obj = await contenedor.getAll()
    res.render('renderProd', {
        productos: obj,
        productExist: true,
        titulo: 'Products ready'
    });
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        contenedor.save({ title, price, thumbnail })
        res.redirect('/productos');

    } else {
        res.send('Missing data');
    }
})

module.exports = router