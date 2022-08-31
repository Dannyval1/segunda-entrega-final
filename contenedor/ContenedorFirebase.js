class ContenedorFirebase {
    constructor(){}

    async created(doc, collectionData){
        await doc.create(collectionData);
    }

    async read(query){
        query.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.id,
                doc.data(); 
            });
        })
    }

    async update(query, keyFind, keyValue, newObjData){
        query
        .where(keyFind, "==", keyValue)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.update(newObjData);
            });
        });
    }

    async delete(query, keyFind, keyValue){
        query
        .where(keyFind, "==", keyValue)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
    }
}