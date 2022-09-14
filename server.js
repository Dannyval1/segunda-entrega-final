import express from "express";

const { Router } = express;
const app = express();

import { productosDao, carritosDao } from "./daos/controller.js";

const routerProductos = Router();
const routerCarrito = Router();

routerProductos.get("/", (req, res) => {
  const productos = await productosDao.read();
  res.status(200).json({
    result: "Productos",
    ListadoDeProductos: productos,
  });
});

routerProductos.get("/:id", (req, res) => {
  console.log("GET request recibido con id");
  const id = Number(req.params.id);
  const producto = productosDao.readOne(id);
  res.send(producto);
});

routerProductos.post("/", (req, res) => {
  console.log("POST request recibido");
  const producto = {
    timestamp: Date.now(),
    nombre: req.query.nombre,
    descripcion: req.query.descripcion,
    codigo: req.query.codigo,
    foto: req.query.foto,
    precio: req.query.precio,
    stock: req.query.stock,
  };
  const newProduct = await productosDao.created(producto);
  res.status(201).json({
    result: "Producto Agregado",
    NuevoProducto: newProduct,
  });
});

routerProductos.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundProduct = {};
  foundProduct.timestamp = req.query.timestamp;
  foundProduct.nombre = req.query.nombre;
  foundProduct.descripcion = req.query.descripcion;
  foundProduct.codigo = req.query.codigo;
  foundProduct.foto = req.query.foto;
  foundProduct.precio = req.query.precio;
  foundProduct.stock = req.query.stock;

  await productosDao.update(id, foundProduct);
  res.status(201).json({
    result: "Producto Actualizado",
    id: req.params.id,
    ProductoActualizado: foundProduct,
  });
});

routerProductos.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const productoBorrado = await productosDao.delete(id);
  res.status(200).json({
    result: "Producto Borrado",
    id: req.params.id,
    ListadoProductosNuevo: productoBorrado,
  });
});

///FUNCIONAMIENTO DEL CARRITO
routerCarrito.post("/", (req, res) => {
  const carrito = {
    timestamp: Date.now(),
  };
  const newCarrito = await carritosDao.created(carrito);
  res.status(201).json({
    result: "Carrito Agregado",
    NuevoCarrito: newCarrito,
  });
});

routerCarrito.delete("/:id", (req, res) => {
  console.log("DELETEcarrito request recibido");
  const id = Number(req.params.id);
  const carritoBorrado = await carritosDao.delete(id);
  res.status(200).json({
    result: "Carrito Borrado",
    id: req.params.id,
    NuevoListadoCarrito: carritoBorrado,
  });
});

routerCarrito.get("/:id/productos", (req, res) => {
  console.log("GET request recibido con id");
  const id = Number(req.params.id);
  const carrito = await carritosDao.readOne(id);
  res.send(carrito);
});

routerCarrito.post("/:id/productos", (req, res) => {
  console.log("POSTcarrito dos request recibido");
  const idCarrito = Number(req.params.id);
  const idProducto = req.body.id;

  const carrito = await carritosDao.readOne(idCarrito);
  const producto = await productosDao.readOne(idProducto);

  carrito.productos.push(producto);
  await carritosDao.update(idCarrito, carrito);
  res.status(201).json({
    result: "Producto agregado al carrito",
    NuevoCarrito: carrito,
  });
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  const idCarrito = Number(req.params.id);
  const idCarritoProd = Number(req.params.id_prod);

  const carrito = await carritosDao.readOne(idCarrito);

  const index = carrito.productos.findIndex((prod) => prod.id == idCarritoProd);
  if (index !== -1) {
    carrito.productos.splice(index, 1);
    await carritosDao.update(idCarrito, carrito);
  }

  res.status(200).json({
    result: "Producto borrado del carrito",
    id: req.params.id,
    ListadoProductosNuevo: carritoBorradoProducto,
  });
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

const server = app.listen(8080, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
