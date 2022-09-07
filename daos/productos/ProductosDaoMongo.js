import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import { Producto } from './models/Producto.js';
class ProductosDaoMongo extends ContenedorMongo {
    constructor(){
        super(Producto);
    }

    async guardar(producto){
        return super.created(producto);
    }
}

export default ProductosDaoMongo;