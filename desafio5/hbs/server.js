const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const router = require('./routes/index')

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials/"
});

app.use(express.static("public"));

app.engine("hbs", hbs.engine);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("form")
});

app.use("/productos", router);

const PORT = process.env.PORT || 8080;
const server = app.listen( PORT, () => {
    console.log( `Server on PORT: ${ PORT }` );
});
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );
