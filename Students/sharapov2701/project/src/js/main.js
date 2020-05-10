const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/sharapov2701/goods/master/goods.json',
        catalog: [],
        cart: [],
        toggle_cart: false,
        search_line: ''
    },
    methods: {
        buy (item) {
            let find = this.cart.find (product => product.id === item.id);
            if (find) {
                find.quantity++;
            } else {
                this.cart.push(item);
                item.quantity++;
            }
            this.toggle_cart = true;
        },
        remove (item) {
            let find = this.cart.find (product => product.id === item.id);
            if (find.quantity > 1) {
                find.quantity--
            } else {
                find.quantity--
                this.cart.splice (this.cart.indexOf(find), 1)
            }
        }
    },
    computed: {
        get_price () {
            let price = 0;
            this.cart.forEach(item => {
                price += item.price * item.quantity;
            });
            return price;
        },
        get_quantity () {
            let quantity = 0;
            this.cart.forEach(item => {
                quantity += item.quantity;
            });
            return quantity;
        },
        catalog_filtered () {
            if (this.search_line !== '') {
                const regexp = new RegExp(this.search_line, 'i');
                let catalog_filtered = this.catalog.filter(good => regexp.test(good.name));
                return catalog_filtered
            } else {
                return this.catalog
            }
          }
    },
    async beforeMount() {
        try{
            this.catalog = await fetch(this.url).then(d => d.json());
        }
        finally{
            
        }
    }
  });