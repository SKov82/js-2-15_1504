<template>
  <div class="products">
    <item v-for="item of filtered" :item="item" :key="item.product_id"/>
    <item :type="'temp'" @addNewItem="createNew"/>
  </div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    props: {
        filter: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            items: [],
            filtered: [],
            // url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
            url: '/api/catalog'
        }
    },
    mounted() {
        this.$parent.get(this.url)
        .then(data => { 
            this.items = data; 
            this.filtered = data; 
        });
    },
    methods: {
        search(str) {
            if (!str) {
                this.filtered = this.items;
            } else {
                let reg = new RegExp(str, 'ig');
                this.filtered = this.items.filter(el => reg.test(el.product_name));
            }
        },
        createNew(item) {
            let newItem = JSON.parse(JSON.stringify(item));

            this.$parent.post('/api/catalog', newItem)
                .then( res => {
                    if (res.id) {
                        this.items.push({
                            id_product: res.id,
                            product_name: newItem.product_name,
                            price: newItem.price
                        })
                    }
                } )
        }
    },
    watch: {
        filter: {
            // deep: true, //или false
            // immediate: true, //немедленно
            handler() {
                this.search(this.filter);
            }
        }
    },
}
</script>

<style>

</style>