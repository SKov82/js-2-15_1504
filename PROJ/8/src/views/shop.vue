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
import catalog from '../containers/catalog.vue';
import basket from '../containers/basket.vue';
import filterItem from '../components/filterItem.vue';
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
        post(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
            .then(res => res.json())
        },
        delete(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
        },
        put(url, item) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
            .then(res => res.json())
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