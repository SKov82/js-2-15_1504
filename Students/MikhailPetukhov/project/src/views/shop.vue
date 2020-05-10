<template>
	<div>
		<header>
        	<div class="logo">BestKidsWear</div>
            <div class="cart">
                <filter-item @search="filterElements"/>
                <button class="btn-cart" @click="showBasket = !showBasket">{{ computedLabel }}</button>
                <basket v-show="showBasket" ref="basket"/>
            </div>
        </header>
        <main>
        	<catalog ref="catalog" @add="addToBasket" :filter="filterString"/>
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
            post(url, item) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item)
                })
                .then(response => response.json())
            },      
            addToBasket(item) {
                this.$refs.basket.add(item);
            },
            filterElements(payload) {
                this.filterString = payload;
            },
            // filterProducts() {
            //     let data = document.querySelector(`input[class="search-field"]`).value;
            //     this.$refs.catalog.filterItems(data);
            // }
		},
        computed: {
            computedLabel() {
                return `${this.showBasket ? "Скрыть" : "Корзина"}`
            }
        },
	}
</script>

<style>

</style>