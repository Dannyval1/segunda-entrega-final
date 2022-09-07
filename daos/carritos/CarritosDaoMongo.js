import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import { Carrito } from './models/Carrito.js';
class CarritosDaoMongo extends ContenedorMongo {
    constructor(){
        super(Carrito);
    }

    async guardar(carrito){
        return super.created(carrito);
    }
}

export default CarritosDaoMongo;