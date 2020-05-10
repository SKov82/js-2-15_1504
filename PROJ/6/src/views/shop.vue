<template>
  <div>
    <header>
        <div class="logo">E-shop</div>
        <div class="cart">
            <filter-item @search="filterElements"/>
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <basket v-show="showBasket" ref="basket"/>
        </div>
    </header>
    <main>
        <catalog @add="addItem" :filter="filterString"/>
    </main>
  </div>
</template>

<script>
import catalog from '../components/containers/catalog.vue';
import basket from '../components/containers/basket.vue';
import filterItem from '../components/components/filterItem.vue';
export default {
    components: { catalog, basket, 'filter-item': filterItem },
    data() {
        return {
            showBasket: false,
            filterString: ''
        }
    },
    methods: {
        get(url) {
            return fetch(url).then(d => d.json());
        },
        filterElements(payload) {
            this.filterString = payload;
        },
        addItem(item) {
            this.$refs.basket.add(item);
        }
    }
}
</script>

<style>

</style>