import ContenedorFirebase from '../../contenedor/ContenedorFirebase';
class ProducosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super();
    }

    async conectar(){
        const admin = require("firebase-admin");
        const serviceAccount = require("./db/test-coder-928b9-firebase-adminsdk-pbxfh-d4e455f2e3.json");
            admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
}