import { initializeApp, credential as _credential, firestore } from "firebase-admin";
import serviceAccount from "./db/segunda-entrega-final-9246b-firebase-adminsdk-qgir7-029b2dee88.json";

initializeApp({credential: _credential.cert(serviceAccount)});

const db = firestore();
class ContenedorFirebase {
    constructor(coleccion){
        this.coleccion = db.collection(coleccion);
    }

    created(newElement){
        let doc = this.coleccion.doc();
        const createElement = doc.create(newElement);
        return {
            ...newElement,
            id: createElement.id
        };
    }

    read(){
        this.coleccion.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.id,
                doc.data();
            });
        })
    }

    update(idElement, newElement){
        this.coleccion
        .where('id', "==", idElement)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.update(newElement);
            });
        });
    }

    delete(idElement){
        this.coleccion
        .where('id', "==", idElement)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
    }
}

export default ContenedorFirebase;