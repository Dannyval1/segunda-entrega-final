import mongoose from "mongoose";
import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import { Carrito } from './models/Carrito.js';
class CarritosDaoMongo extends ContenedorMongo {
    constructor(){
        super(Carrito);
    }

    async conectar(){
        try {
            mongoose.connect('mongodb://localhost:27017/segundaFinal');
            console.log("COENECTADO AL MONGODB");
        } catch (error) {
            console.log("Error al conectarse a la BD: ", error);
        }
    }

    async desconectar(){
        try {
            mongoose.disconnect();
        }catch(error){
            console.log(error);
        }
    }
}