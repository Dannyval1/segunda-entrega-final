// requires necesarios
import express from 'express';

const { Router } = express;
const app = express();

//routers
const routerProductos = Router();
const routerCarrito = Router();

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));