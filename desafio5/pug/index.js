const express = require( 'express' );
const router = express.Router();
const fs = require( 'fs' );
const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( '/api/productos', router );

app.set( 'view engine', 'pug' );
app.set( 'views', __dirname + '/views' );

app.get( '/', ( req, res ) => {
    res.render( 'index', { mesage: '' } )
});

router.get( '/', ( req, res ) => {
    const read = fs.readFileSync( './productos.txt', 'utf-8' );
    const products = JSON.parse( read );
    res.render( 'productos', { products: products } );
});

router.get( '/:id', ( req, res ) => {
    const id = Number( req.params.id );
    const read = fs.readFileSync( './productos.txt', 'utf-8' );
    const products = JSON.parse( read );
    const product = products.find( prod => prod.id === id );
    if ( product == undefined ){
        res.send({ error: 'Product not found' });
    } else {
        res.json( product );
    }
});

router.post( '/', ( req, res ) => {
    const product = req.body;
    const read = fs.readFileSync( './productos.txt', 'utf-8' );
    const products = JSON.parse( read );
    const productsId = products.map( p => p.id );
    product.id = Math.max( ...productsId ) + 1;
    products.push( product );
    fs.writeFileSync( './productos.txt', JSON.stringify( products, null, '\t' ) );
    res.render( 'index', { mesage: 'Product added' } );
});

router.put( '/:id', ( req, res ) => {
    const id = req.params.id;
    const product = req.body;
    product.id = id;
    const read = fs.readFileSync( './productos.txt', 'utf-8' );
    const products = JSON.parse( read );
    const idx = products.findIndex( p => p.id == id );
    if( idx === -1 ){
        res.send( 'Product does not exist' )
    } else {
        products.splice( idx, 1, product );
        fs.writeFileSync( './productos.txt', JSON.stringify( products, null, '\t' ) );
        res.json( product );
    }
});

router.delete( '/:id', ( req, res ) => {
    const id = req.params.id;
    const read = fs.readFileSync( './productos.txt', 'utf-8' );
    const products = JSON.parse( read );
    const idx = products.findIndex( p => p.id == id );
    if( idx === -1 ){
        res.send( 'Does not exist.' )
    } else {
        products.splice( idx, 1 );
        fs.writeFileSync( './productos.txt', JSON.stringify( products, null, '\t' ) );
        res.json( `Product with ${ id } does no longer exist` );
    }
});

const PORT = process.env.PORT || 8080;
const server = app.listen( PORT, () => {
    console.log( `Server on PORT: ${ PORT }` );
});
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );
