<template>
    <div class="products" v-if="filteredItems.length">

        <item 
        	v-for="item of filteredItems"
        	:item="item"
        	:key="item.id"
        /> 
        <item :type="'temp'" @addNewItem="createNew"/>  

    </div>
    <div v-else>
    	<h1>НЕТ ИНФОРМАЦИИ</h1> 	
    </div>
</template>

<script>
	import item from'../components/item.vue';
	import stat from'../components/stat.vue';
	export default {
		components: { item, stat },
		props: {
			filter: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				items:[],
				filteredItems:[],
				// url: 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses/getCatalog.json'
				url: '/api/catalog'
			}
		},
		methods: {
			filterItems(search) {
				if (search) {
					const regexp = new RegExp(search, 'i');
	        		this.filteredItems = this.items.filter(item => regexp.test(item.name));
	        	} else {
					this.filteredItems = this.items;
	        	}
			},
			createNew(item) {
                this.$parent.post('/api/catalog', item)
                    .then( response => {
                        if (response.id) {
                        	this.items.push(
                        		Object.assign({}, item,  {id: response.id})
                        	)
                        }
                    })
			}
		},
		mounted() {
			this.$parent.get(this.url)
			.then(data => {
				this.items = data;
				// Хочу перенести следующую строку в then или finally
				this.filteredItems = data;
			})
			// .then(
			// 	this.filteredItems = this.items
			// )
			// .finally(
			// 	this.filteredItems = this.items
			// )	
		},
		watch: {
			filter: {
				deep: true,
				immediate: true,
				handler() {
					this.filterItems(this.filter);
				}
			}
		}
	}
	
</script>

<style>
	
</style>