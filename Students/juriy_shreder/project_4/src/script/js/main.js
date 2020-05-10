let API = "https://raw.githubusercontent.com/jushreder/static/master";

class List {
  constructor(url, container) {
    this.url = url;
    this.container = container;
    this.items = [];
    this._init();
  }
  async _init() {
    try {
      let data = await this._get(API + this.url);
      this.items = this.constructor.name == "Basket" ? data.contents : data;
    } catch (err) {
      console.log(`error loading ${this.constructor.name}`);
    } finally {
      this.render();
      this._handleEvents();
      if (this.constructor.name == "Basket") {
        this._checkTotalAndSum();
      }
    }
  }
  // _init(){
  //   this._get(API + this.url)
  //   .then(data => {
  //     // this.items= this.constructor.name == 'Basket' ? data.contents : data;
  //     this.items =  data;
  //     console.log(this.items)
  //   })
  //   .catch(()=>{
  //     console.log(`error loading ${this.constructor.name}`)
  //   })
  // }
  _get(url) {
    return fetch(url).then((d) => d.json());
    // return new Promise((res,rej)=>{
    //   let req = new XMLHttpRequest();
    //   req.open('GET', url, true);
    //   req.onreadystatechange = function () {
    //     if (req.readyState == 4) {
    //       if(req.status == 200){
    //           res(JSON.parse(req.responseText))
    //           } else {
    //         rej("Error loading");}
    //     }
    //   };
    //   req.send();

    // })
  }
  render() {
    let block = document.querySelector(this.container);
    let str = "";
    this.items.forEach((item) => {
      let newItem = new dependencies[this.constructor.name](item);
      str += newItem.render();
    });
    block.innerHTML = str;
  }
}

class Item {
  constructor(item) {
    this.item = item;
  }
  render() {
    return `<div class="product-item">
                    <!--img src="https://placehold.it/300x200" alt="${this.item.product_name}"-->
                    <img src="${this.item.img}" alt="${this.item.product_name}">
                    <div class="desc">
                        <h1>${this.item.product_name}</h1>
                        <p>${this.item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${this.item.product_name}"
                        data-price="${this.item.price}"
                        data-id="${this.item.id_product}"
                        data-img="${this.item.img}"
                        >Купить</button>
                    </div>
                </div>
            `;
  }
}

class Catalog extends List {
  constructor(basket, url, container) {
    super(url, container);
    this.basket = basket;
    this.url = url;
    this.container = container;
  }
  _handleEvents() {
    document.querySelector(this.container).addEventListener("click", (evt) => {
      if (evt.target.name === "buy-btn") {
        this.basket.add(event.target);
      }
    });
  }
}

class Basket extends List {
  constructor(url, container) {
    super(url, container);
  }
  _handleEvents() {
    document
      .querySelector(this.container)
      .addEventListener("click", (event) => {
        if (event.target.name === "del-btn") {
          this.remove(event.target);
        }
      });
    document.querySelector(".btn-cart").addEventListener("click", (evt) => {
      document.querySelector(".cart-block").classList.toggle("hidden");
    });
  }
  add(product) {
    let id = product.dataset["id"];
    let find = this.items.find((product) => product.id_product == id);

    if (find) {
      find.quantity++;
    } else {
      let prod = this._createNewProduct(product);
      this.items.push(prod);
    }

    this._checkTotalAndSum();
    this.render();
  }
  _createNewProduct(prod) {
    return {
      product_name: prod.dataset["name"],
      price: prod.dataset["price"],
      id_product: prod.dataset["id"],
      quantity: 1,
      img: prod.dataset["img"],
    };
  }
  remove(product) {
    let id = product.dataset["id"];
    let find = this.items.find((product) => product.id_product == id);
    if (find.quantity > 1) {
      find.quantity--;
    } else {
      this.items.splice(this.items.indexOf(find), 1);
    }

    this._checkTotalAndSum();
    this.render();
  }
  _checkTotalAndSum() {
    let qua = 0;
    let pr = 0;

    this.items.forEach((item) => {
      qua += item.quantity;
      pr += item.price * item.quantity;
    });
    document.querySelector("#quantity").innerHTML = qua + ' шт.';
    document.querySelector("#price").innerHTML = pr + ' руб.';
  }
}

class CatalogItem extends Item {}

class BasketItem extends Item {
  render() {
    return `<div class="cart-item" data-id="${this.item.id_product}">
                <img src="${this.item.img}"   alt="${this.item.product_name}">
                <div class="product-desc">
                    <p class="product-title">${this.item.product_name}</p>
                    <p class="product-quantity">${this.item.quantity}</p>
                    <p class="product-single-price">${this.item.price}</p>
              
                </div>
                <div class="right-block">
                    <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
                </div>
          </div>`;
  }
}

let dependencies = {
  Catalog: CatalogItem,
  Basket: BasketItem,
};

export default function () {
  let basket = new Basket("/getBasket.json", ".cart-items");
  let catalog = new Catalog(basket, "/catalogData.json", ".products");
}
