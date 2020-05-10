class Burger {

    init = () => {
        this.changer(this);
        this.ingredients();
    };

    ingredients = () => {
        this.burger = this.filler('burger');
        this.add = this.filler('add');
        this.spice = this.filler('spice');
        this.mayon = this.filler('mayon');
        this.counter([this.burger, this.add, this.spice, this.mayon]);
    }

    filler = (str) => {
        const values = document.getElementsByName(str)
        for (let i = 0; i < values.length; i++) {
            if (values[i].checked === true) {
                return values[i].dataset;
            }
        }
    }

    changer = (obj) => {
        let inputs = document.querySelectorAll('input');
        inputs.forEach((el) => {
            el.addEventListener('change', function () {
                obj.ingredients();
            })
        })
    }

    counter = (arr) => {
        let price = 0;
        let cal = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) {
                price += parseInt(arr[i].price);
                cal += parseInt(arr[i].cal);
            }
        }
    this.render(price, cal)
    }

    render = (price, cal) => {
        document.getElementById('summary_price').innerText = price;
        document.getElementById('summary_cal').innerText = cal;
    }
}

const x = new Burger();
x.init()
