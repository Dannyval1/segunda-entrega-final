const varEnvironment = 'mongo';

let productosDao;
let carritosDao;

switch (varEnvironment) {
    case 'mongo':
        const daoProductosMongo = import('./productos/ProductosDaoMongo');
        const daoCarritosMongo = import('./carritos/CarritosDaoMongo');

        productosDao = new daoProductosMongo();
        carritosDao = new daoCarritosMongo();
        break;

    case 'firebase':
        const daoProductosFirebase = import('./productos/ProductosDaoFirebase');
        const daoCarritosFirebase = import('./carritos/CarritosDaoFirebase');

        productosDao = new daoProductosFirebase();
        carritosDao = new daoCarritosFirebase();
    break;
}

export { productosDao, carritosDao };