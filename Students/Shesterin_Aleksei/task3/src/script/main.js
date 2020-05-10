let goodsUrl = 'https://raw.githubusercontent.com/xenophorus/static/master/goods.json'

class catalog {
    constructor() {
        this.items = []
        this.container = '.products'
        this.cart = null
    }

    construct(cart) {
        this.cart = cart
        this._init() //_ - это обозначение инкапсулированного метода
    }

    _init() {
        this._handleData(goodsUrl)
        // this.render()
        this._handleEvents()
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct(evt.target)
            }
        })
    }

    _handlePromise(url1) {
        return new Promise((res, rej) => {
            let request = new XMLHttpRequest();
            request.open('GET', url1, true);
            request.send();
            request.timeout = 5000;
            // Я так и не понял, почему request.onreadystatechange не сработал. в script.js все работает, здесь - нет.
            request.onload = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        res(JSON.parse(request.responseText))
                    } else {
                        rej('Error')
                    }
                } else {
                    rej('Error')
                }
            }

        })
    }

    _handleData(url) {
        this._handlePromise(url)
            .then(data => {
                this.items = data;
                this.render(data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(data) {
        let str = ''
        console.log(data)
        data.forEach(item => {
            str += `
                <div class="product-item">
                  
                    <!--<img src="https://placehold.it/300x200" alt="${item.product_name}">-->
                    <div class="image">
                    <img src="${item.img}" width="200" alt="${item.product_name}"></div>
                    <div class="desc">
                        <h1>${item.product_name}</h1>
                        <p>${item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${item.product_name}"
                        data-price="${item.price}"
                        data-id="${item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str
    }
}

class cart {
    constructor() {
        this.items = []
        this.total = 0
        this.sum = 0
        this.container = '.cart-block'
        this.quantityBlock = document.querySelector('#quantity')
        this.priceBlock = document.querySelector('#price')
    }

    construct() {
        this._init()
    }

    _init() {
        this._handleEvents()
        this.hider()
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct(evt.target)
            }
        })
    }

    addProduct(product) {
        let id = product.dataset['id']
        let find = this.items.find(product => product.id_product === id)
        if (find) {
            find.quantity++
        } else {
            let prod = this._createNewProduct(product)
            this.items.push(prod)
        }

        this._checkTotalAndSum()
        this.render()
    }

    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }

    deleteProduct(product) {
        let id = product.dataset['id']
        let find = this.items.find(product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice(this.items.indexOf(find), 1)
        }

        this._checkTotalAndSum()
        this.render()
    }

    _checkTotalAndSum() {
        let qua = 0
        let pr = 0
        this.items.forEach(item => {
            qua += item.quantity
            pr += item.price * item.quantity
        })
        this.total = qua
        this.sum = pr
    }

    render() {
        let itemsBlock = document.querySelector(this.container).querySelector('.cart-items')
        let str = ''
        this.items.forEach(item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`
        })
        itemsBlock.innerHTML = str
        this.quantityBlock.innerText = this.total
        this.priceBlock.innerText = this.sum

    }

    hider() {
        let cartButton = document.querySelector('.btn-cart')
        let cartBlock = document.querySelector('.cart-block')
        cartButton.addEventListener('click', function () {
            if (cartBlock.hasAttribute('hidden')) {
                cartBlock.removeAttribute('hidden')
            } else {
                cartBlock.setAttribute('hidden', 'true')
            }
        })
    }
}

let x = new catalog;
let y = new cart();
x.construct(y);
y.construct();
