<template>
  <div class="cart-block">
    <div class="d-flex">
        <strong class="d-block">Всего товаров</strong> <div id="quantity"></div>
    </div>
    <hr>
    
    <item 
        type="basket" 
        v-for="item of items" 
        :key="item.id_product"
        :item="item"
        @remove="remove"
    /> <!--не забыть все пропы-->

    <hr>
    <div class="d-flex">
        <strong class="d-block">Общая ст-ть:</strong> <div id="price"></div>
    </div>
</div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    data() {
        return {
            //айтемы и урл
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'
        }
    },
    methods: {
        //добавить товар
        //удалить товар
        add(item) {
            let find = this.items.find(el => el.id_product == item.id_product);
            if (!find) {
                this.items.push(Object.assign({}, item, {quantity: 1}));
            } else {
                find.quantity++;
            }
        },
        remove(item) {
            if (item.quantity == 1) {
                this.items.splice(this.items.indexOf(item), 1);
            } else {
                item.quantity--;
            }
        }
    },
    mounted() {
        this.$parent.get(this.url)
        .then(data => { 
            this.items = data.contents; 
        });
        //запрос - размещение
    },
    computed: {
        //всего товаров
        //общая стоимость
    }
}
</script>

<style>

</style>