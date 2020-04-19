class App {
    constructor(form) {
        this.form = null;
        this.items = [];
        this._init(form);
    }
    _init(form) {
        //инкапсулированный метод
        this.form = document.querySelector(form);
        document.querySelector('#app').addEventListener('click', () => {
            this.addNewItem();
        });
        console.log('Form is ready');
    }

    addNewItem() {
        console.log(this)
        this.items.push(new User('Name', 'Age', 'Gender', 'Hobbies', this.form));
        this.showItems();
    }

    showItems() {
        console.log(this.items);
    }
}

class User {
    constructor(name, age, gender, hobbies, form) {
        this.form = form;
        //
        this.name = this._text(name);
        this.age = this._text(age);
        this.gender = this._option(gender);
        this.hobbies = this._checkboxes(hobbies);
    }

    _text(selector) {
        let domEl = this.form.querySelector(`input[name=${selector}]`);
        return domEl.value
    }
    _option(selector) {
        let domEl = this.form.querySelector(`input[name=${selector}]:checked`);
        return domEl.value
    }
    _checkboxes(selector) {
        let domElArray = [...this.form.querySelectorAll(`input[name=${selector}]:checked`)];
        let array = []
        domElArray.forEach(el => {
            array.push(el.dataset.hobbie)
        })
        return array
    }
}

export default function () {
    let app = new App('#app-form')
}
// class Human {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     goWork() {
//         console.log(`${this.name} goes work`);
//     }
// }

// class Male extends Human {
//     someMaleMethod() {
//         return
//     }
// }

// class Female extends Human {
//     constructor(name, age, pregnant) {
//         super(name, age);
//         this.pregnant = pregnant;
//     }
// }

// export default function() {
//     let doris = new Female('Doris', 23, false);
//     let boris = new Male('Boris', 25);

//     console.log(doris, boris);

//     doris.goWork();
//     boris.goWork();
// }
// class Some {
//     constructor(a, b) {
//         this.a = a;
//         this.b = b;
//     }

//     calc() {
//         console.log(this.a + this.b)
//     }
// }

// export default function() {
//     let a = new Some(50, 50);
//     a.calc();

//     let b = new Some(500, 500);
//     b.calc();

//     console.log(a, b);
// }
// function constructor (a, b) {
//     return {
//         a: a,
//         b: b,
//         calc() {
//             console.log(this.a + this.b)
//         }
//     }
// }

// export default function () {
//     let a = constructor(10, 20);
//     a.calc();
    
//     let b = constructor(100, 200);
//     b.calc();
//     console.log(a, b);
// }