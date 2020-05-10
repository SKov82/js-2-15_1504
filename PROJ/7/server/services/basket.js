module.exports = {
    add(item, basket) {
        basket.contents.push(item);
        return { newBasket: basket, itemName: item.product_name, actionName: 'add' };;
    },
    change(id, basket, amount) {
        let find = this._find(id, basket.contents);
        find.quantity += amount;
        return { newBasket: basket, itemName: find.product_name, actionName: amount > 0 ? 'increase' : 'decrease' };
    },
    delete(id, basket) {
        let find = this._find(id, basket.contents);
        basket.contents.splice(basket.contents.indexOf(find), 1);
        return { newBasket: basket, itemName: find.product_name, actionName: 'delete' };
    },
    _find(id, array) {
        return array.find(item => item.id_product == id);
    }
};