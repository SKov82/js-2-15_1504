module.exports = {
    add(item, array) {
        let newObj = JSON.parse(JSON.stringify(item));
        newObj.id_product = 'id_' + Date.now();
        array.push(newObj);
        return  { catalog: array, newId: newObj.id_product };
    }
};