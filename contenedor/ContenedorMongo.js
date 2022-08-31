class ContenedorMongo {
    constructor(model){
        this.model = model;
    }

    async created(dataModel){
        const newElement = new this.modelo(dataProducto);
        await newElement.save();
    }

    async read(){
        const elements = await this.modelo.find();
        return elements;
    }

    async update(findObj, newObj){
        const updateElement = await this.modelo.findOneAndUpdate({
            findObj,
            newObj
        });
    }

    async delete(deleteObj){
        const deleteElement = await this.modelo.deleteOne(deleteObj);
    }
}