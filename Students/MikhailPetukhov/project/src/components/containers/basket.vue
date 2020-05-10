<template>
     <div class="cart-block">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong> <div id="quantity">{{ computedSummary.quantity }}</div>
        </div>
        <hr>

        <item
          	v-for="item of items"
        	:item="item"
        	:key="item.id"
        	:type="'basket'"
        	@remove="remove"
        />

        <hr>

        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong> <div id="amount">{{ computedSummary.amount }}</div>
        </div>
    </div>	
</template>

<script>
    import item  from'../components/item.vue';
    export default {
        components: { item },
        data() {
            return {
                items: [],
                // url: 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses/getBasket.json'
                url: '/api/basket'
            }
        },
        methods: {
            add(item) {
                let find = this.items.find (product => product.id == item.id);
                if (find) {
                    find.quantity++;
                } else {
                    let newBasketItem = Object.assign({}, item, {quantity: 1});
                    this.items.push(newBasketItem);                    
                } 
                this.$parent.post('/api/basket/add', item);             
            },
            remove(item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    this.items.splice (this.items.indexOf(item), 1);                    
                }
                this.$parent.post('/api/basket/remove', item);
            }
        },
        mounted() {
            this.$parent.get(this.url)
            .then(data => {
                this.items = data
            })
        },
        computed: {
            computedSummary() {
                let quantity = 0;
                let amount = 0;
                this.items.forEach (item => {
                    quantity += (+item.quantity);
                    amount += item.price * item.quantity;
                });
                return {quantity, amount}
            },
        }
    }

</script>

<style>
	
</style>