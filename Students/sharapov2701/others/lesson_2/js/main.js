"use strict";

class Option {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Hamburger {

    options = []

    constructor(size, stuffing) {
        this.options[0] = size;
        this.options[1] = stuffing;
     }

    // Добавить добавку
    addToppings(toppings) {
        this.options.push(...toppings);
    }

    // Убрать добавку
    removeTopping(topping) {
        this.options.splice(this.options.indexOf(topping.name), 1)
    }

    // Получить список добавок
    getToppings() {
        let topping_list = []
        for (let i = 2; i < this.options.length; i++) {
            topping_list.push(this.options[i].name);
        }
        return topping_list
    }

    // Узнать размер гамбургера 
    getSize() {              
        return this.options[0].name;
    }

    // Узнать начинку гамбургера 
    getStuffing() {          
        return this.options[1].name;
    }

    // Узнать цену 
    calculatePrice() {     
        let price = 0;
        for (let i = 0; i < this.options.length; i++) {
            price += this.options[i].price;
        }
        return price
    }

    // Узнать калорийность
    calculateCalories() { 
        let calories = 0;
        for (let i = 0; i < this.options.length; i++) {
            calories += this.options[i].calories;
        }
        return calories
    }
  }


// размеры
const big = new Option('Большой', 100, 40)
const small = new Option('Маленький', 50, 20)
const sizes = [big, small]

// начинки
const with_cheese = new Option('с сыром', 10, 20)
const with_salat = new Option('с салатом', 20, 5)
const with_potato = new Option('с картофелем', 15, 10)
const stuffings = [with_cheese, with_salat, with_potato]

// добавки
const flavoring = new Option('приправа', 15, 0)
const mayo = new Option('майонез', 20, 5)
const toppings = [flavoring, mayo]

let menu = {
    dom_menu: document.querySelector(".menu"),

    init() {
        menu._menu_section('размеры', sizes)
        menu._menu_section('начинки', stuffings)
        menu._menu_section('добавки', toppings)
    },

    _menu_section(name, arr) {
        let section = document.createElement("div")
        section.classList.add("menu_section")
        let str = `${name}` 
        arr.forEach (item => {
            str += `
                <div>
                    <p><strong>${item.name}</strong></p>
                    <p>Калории: ${item.calories}</p>
                    <p>Цена: ${item.price}</p>
                    <button name="${item.name}">выбрать</button>`;
            if (arr === toppings) {
                str += `<button name="delete-${item.name}">убрать</button>`;
            }
            str += `</div>`
            section.addEventListener('click', (evt) => {
                if (evt.target.name === item.name) {
                    switch (arr) {
                        case sizes:
                            burger.size = item;
                            burger.render();
                            break
                        case stuffings:
                            burger.stuffing = item;
                            burger.render();
                            break
                        case toppings:
                            if (burger.toppings.includes(item) === false) {
                                burger.toppings.push(item);
                                burger.render();
                                break
                            }
                    }
                }
                else if (evt.target.name === `delete-${item.name}`) {
                    let idx = burger.toppings.indexOf(item);
                    if (idx != -1) {
                        burger.toppings.splice(burger.toppings.indexOf(item), 1);
                    }
                    burger.render();
                }
            });
        })
        section.innerHTML = str
        this.dom_menu.appendChild(section)
    },

 }

 let burger = {
    dom_burger: document.querySelector(".your_burger"),
    size: '',
    stuffing: '',
    toppings: [],

    render() {
        if (this.size !== '' && this.stuffing !== '') {
            let burger = new Hamburger(this.size, this.stuffing);
            let size = burger.getSize();
            let stuffing = burger.getStuffing();
            let str = ''
            str = `${size} бургер ${stuffing}`
            if (this.toppings.length !== 0) {
                burger.addToppings(this.toppings);
                let toppings = burger.getToppings();
                str += ` + ${toppings}`;
            }
            let price = burger.calculatePrice();
            let calories = burger.calculateCalories();
            str += `
            <br>Стоимость: ${price}
            <br>Калорийность: ${calories}
            `;
            this.dom_burger.innerHTML = str;
        }        
    }

 }

 menu.init();