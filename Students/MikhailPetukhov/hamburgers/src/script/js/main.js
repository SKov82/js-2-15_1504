import Order from "./components/order.js";
import Hamburger from "./components/hamburger.js";
import { BASES, STUFFINGS, TOPPINGS } from "./components/products.js"

class App {
    constructor(form) {
        this.form = null;
        this.item = null;
        this._init(form);
    }
    _init(form) {
        //инкапсулированный метод
        this._renderForm();
        this.form = document.querySelector(form);
        document.querySelector('#app').addEventListener('click', () => {
            this.makeChoice();
        });
    }

    _renderForm() {
        let bases = Object.keys(BASES);
        let stuffings = Object.keys(STUFFINGS);
        let toppings = Object.keys(TOPPINGS);
    	let str = `<form action="#" id="app-form"><fieldset>`;


        bases.forEach( el =>
            str += `<label class="my_label"><input type="radio" name="Base" value="${el}"> ${el} </label>`
        );
        str += `</fieldset><fieldset>`
        stuffings.forEach(el =>
            str += `<label class="my_label"><input type="radio" name="Stuffing" value="${el}"> ${el} </label>`
         );
        str += `</fieldset><fieldset>`
        toppings.forEach(el =>
            str += `<label class="my_label"><input type="checkbox" name="Topping" data-topping="${el}"> ${el} </label>`
         );
        str += `
                </fieldset>
            </form>
            <button id="app">Calculate</button>
        </div>`;
		document.querySelector(".my-2").innerHTML = str;
    }

    makeChoice() {
        this.item = new Hamburger('Base', 'Stuffing', 'Topping', this.form);
        let order = new Order(this.item);
    }
}

export default function () {
    let app = new App('#app-form')
}
