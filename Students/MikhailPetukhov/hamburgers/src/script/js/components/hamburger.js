class Hamburger {
    constructor(base, stuffing, topping, form) {
        this.form = form;
        //
        this.base = this._option(base);
        this.stuffing = this._option(stuffing);
        this.toppings = this._checkboxes(topping);
    }

    // _text(selector) {
    //     let domEl = this.form.querySelector(`input[name=${selector}]`);
    //     return domEl.value
    // }
    
    _option(selector) {
        let domEl = this.form.querySelector(`input[name=${selector}]:checked`);
        return domEl.value
    }
    _checkboxes(selector) {
        let domElArray = [...this.form.querySelectorAll(`input[name=${selector}]:checked`)];
        let array = []
        domElArray.forEach(el => {
            array.push(el.dataset.topping)
        })
        return array
    }
}

export default Hamburger;