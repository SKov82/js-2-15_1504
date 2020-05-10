<template>
  <div class="products">
    <item v-for="item of filtered" :item="item" :key="item.product_id"/>
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
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
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