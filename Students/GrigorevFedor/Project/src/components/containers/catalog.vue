<template>
  <div class="products">
    <item v-for="item of filteredItems" :item="item" :key="item.product_id" :type="'catalog'"/>
  </div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    props: {
        filterStr: ''
    },
    data() {
        return {
            items: [],
            filteredItems: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        }
    },
    mounted() {
        this.$parent.get(this.url)
        .then(data => { 
            this.items = data; 
            this.filteredItems = data; 
        });
    },
    methods: {
        filter(){
            let reg = new RegExp(this.filterStr, 'ig');
            this.filteredItems = this.items.filter(el => reg.test(el.product_name))
        }
    }
}
</script>

<style>

</style>