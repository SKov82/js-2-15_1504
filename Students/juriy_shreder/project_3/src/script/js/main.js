 
let url ='https://raw.githubusercontent.com/jushreder/static/master/catalogData.json'

 
let catalog = {
    items: [],
    container: '.products',
    cart: null,
    construct (cart, url) {
        this.url = url
        this.cart = cart
        this._init () //_ - это обозначение инкапсулированного метода
    },
    _init () {
        this._getData(this.url).then(data =>{
             this.items = data
             this.render ()
             this._handleEvents (data)
            })
             
             .catch(err =>{
            return err
          })
        
    },
    _handleEvents (data) {
        document.querySelector (this.container).addEventListener ('click', (evt) => {           
            if (evt.target.name === 'buy-btn') {
                let id_evt= evt.target.dataset['id']
                let img_evt = data.find(img =>img.id_product == id_evt).img
                this.cart.addProduct (evt.target, img_evt)
            }
        })
        document.querySelector (".btn-cart").addEventListener ('click', (evt) => {    
            let el = document.querySelector('.cart-block')
            
            if (el.classList.contains("hidden")) 
            { console.log('hello world!')
                el.classList.remove("hidden")
            } else {
                el.classList.add("hidden")
            }
        })
    },
    _getData(url){
        return new Promise((res,rej)=>{
          let req = new XMLHttpRequest();
          req.open('GET', url, true); 
          req.onreadystatechange = function () {
            if (req.readyState == 4) {        
              if(req.status == 200){
                  res(JSON.parse(req.responseText))
                  } else {
                rej("Error loading");}
            }
          };
          req.send();
        
        })
      },
    
    render () {

        let str = ''
        this.items.forEach (item => {
            
            str += `
                <div class="product-item">
                    <!--img src="https://placehold.it/300x200" alt="${item.product_name}"-->
                    <img src="${item.img}" alt="${item.product_name}">
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

let cart = {
    items: [],
    total: 0,
    sum: 0,
    container: '.cart-block',
    quantityBlock: document.querySelector ('#quantity'),
    priceBlock: document.querySelector ('#price'),
    construct () {
        this._init ()
    },
    _init () {
        this._handleEvents ()
    },
    _handleEvents () {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct (evt.target)
            }
        })
    },
    addProduct (product, img_evt) {
        let id = product.dataset['id']
        let find = this.items.find (product => product.id_product === id)
        if (find) {
            find.quantity++
        } else {
            let prod = this._createNewProduct (product, img_evt)
            this.items.push (prod)
        }
         
        this._checkTotalAndSum ()
        this.render ()
    },
    _createNewProduct (prod, img_evt) {
        
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1,
            img: img_evt
        }
    },
    deleteProduct (product) {
        let id = product.dataset['id']
        let find = this.items.find (product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }
         
        this._checkTotalAndSum ()
        this.render ()
    },
    
    _checkTotalAndSum () {
        let qua = 0
        let pr = 0
        this.items.forEach (item => {
            qua += item.quantity
            pr += item.price * item.quantity
        })
        this.total = qua
        this.sum = pr
    },
    render () {
        let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items')
        let str = ''
        this.items.forEach (item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="${item.img}"   alt="${item.product_name}">
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
 }

class Basket{
    constructor(){

    };
};

class ItemsBasket{
    constructor(){

    };
};

export default ()=>{ 
    catalog.construct (cart, url) //тут происходит создание объекта и вся прочая магия
    cart.construct ()
}
 