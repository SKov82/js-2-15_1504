<template>
  <div class="cart-block">
    <div class="d-flex">
        <strong class="d-block">Всего товаров</strong> {{ totalCount }}<div id="quantity"></div>
    </div>
    <hr>
    
    <item 
        v-for="item of items" 
        :item="item" 
        :key="item.product_id" 
        :type="'basket' " 
        @remove="removeFromBasket"
    />

    <hr>
    <div class="d-flex">
        <strong class="d-block">Общая ст-ть:</strong> {{ totalSum }} <div id="price"></div>
    </div>
</div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    data() {
        return {
            items: [],
        }
    },
    methods: {
        addToBasket(item) {
            let find = this.items.find (product => product.id === item.id_product)
            if (find) {
                find.quantity++
            } else {
                this.items.push ({
                    name: item.product_name,
                    price: item.price,
                    id: item.id_product,
                    quantity: 1
                })
            }
        },
        removeFromBasket(item) {
            let find = this.items.find (product => product.id === item.id)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.items.splice (this.items.indexOf(find), 1)
            }
        },
        
    },
    mounted() {
        
    },
    computed: {
        totalCount: function ()  {
            let totalCount = 0;
            this.items.forEach(element => {
                totalCount+=element.quantity    
            });
            return totalCount    
        },

        totalSum: function ()  {
            let totalSum = 0;
            this.items.forEach(element => {
                totalSum+=element.quantity * element.price    
            });
            return totalSum    
        }
    }
}
</script>

<style>

</style>