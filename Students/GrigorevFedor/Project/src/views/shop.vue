<template>
  <div>
    <header>
        <div class="logo">E-shop</div>
        <div class="cart">
            <form action="#" class="search-form">
                <input type="text" class="search-field" v-model="filterStr">
                <button class="btn-search" @click.prevent="filterItems">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <basket v-show="showBasket" ref="basket"/>
        </div>
    </header>
    <main>
        <catalog @add="addToBasket" :filterStr="filterStr" ref="catalog"/>
    </main>
  </div>
</template>

<script>
import catalog from '../components/containers/catalog.vue';
import basket from '../components/containers/basket.vue';
export default {
    components: { catalog, basket },
    
    data() {
        return {
            showBasket: false,
            filterStr:''
        }
    },
    methods: {
        get(url) {
            return fetch(url).then(d => d.json());
        },
        addToBasket(item) {
            this.$refs.basket.addToBasket(item);
        },
        filterItems(){
            this.$refs.catalog.filter();   
        }
    }
}
</script>

<style>

</style>