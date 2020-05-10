import { BASES, STUFFINGS, TOPPINGS } from "./products.js"

class Order {
	constructor(hamburger) {
		this.hamburger = hamburger;
		this._init();

	}

	_init() {
		let params = this.getTotalAmountAndCalories();
		this.render(params);
	}

	getTotalAmountAndCalories() {
        let orderAmount = BASES[this.hamburger.base].price;
        let orderCalories = BASES[this.hamburger.base].calories;
        orderAmount += STUFFINGS[this.hamburger.stuffing].price;
        orderCalories += STUFFINGS[this.hamburger.stuffing].calories;

        this.hamburger.toppings.forEach(el => {
        	orderAmount += TOPPINGS[el].price;
        	orderCalories += TOPPINGS[el].calories;
        });
        return {orderAmount, orderCalories}
	}

	render({orderAmount, orderCalories}) {
        let orderBase = this.hamburger.base;
        let orderStuffing = this.hamburger.stuffing;
        let str = "<h2>YOUR ORDER:</h2>";
        str += `
        		<div>Hamburger base: ${orderBase}, rub ${BASES[orderBase].price}, cal ${BASES[orderBase].calories}</div>
        		<div>Stuffing: ${orderStuffing}, rub ${STUFFINGS[orderStuffing].price}, cal ${STUFFINGS[orderStuffing].calories}</div>
        		`;
        this.hamburger.toppings.forEach(el => {
        	str += `
					<div>Topping: ${el}, rub ${TOPPINGS[el].price}, cal ${TOPPINGS[el].calories}</div>
        			`;
        })
         str += `
				<div>TOTAL AMOUNT: ${orderAmount}, TOTAL CALORIES: ${orderCalories}</div>
        		`;       
        document.querySelector("#order").innerHTML = str;		
	}
}

export default Order;
