import mongoose from "mongoose";

await mongoose.connect('mongodb://localhost:27017/segFinal');
class ContenedorMongo {
    constructor(modelo){
        this.modelo = modelo;
    }

    async created(newElement){
        const createElement = new this.modelo(newElement);
        await createElement.save();
        return {
            ...newElement,
            id: createElement.id
        };
    }

    async read(){
        const elementos = await this.modelo.find();
        return elementos;
    }

    async update(idElemento, newElement){
        const updateElement = await this.modelo.findOneAndUpdate({
            idElemento,
            newElement
        });
        return updateElement;
    }

    async delete(idElemento){
        const deleteElement = await this.modelo.deleteOne(idElemento);
        return deleteElement;
    }

    async desconectar(){
        try {
            mongoose.disconnect();
        }catch(error){
            console.log(error);
        }
    }
}

export default ContenedorMongo;