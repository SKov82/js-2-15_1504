<template>
  <div :class="type === 'catalog' || type === 'temp'? 'product-item' : 'cart-item'">
    <img :src="`https://placehold.it/${type === 'catalog' || type === 'temp' ? '300x200' : '100x80'}`">

    <template v-if="type == 'catalog'">
        <div class="desc">
            <h1>{{ item.product_name }}</h1>
            <p>{{ item.price }}</p>
            <button class="buy-btn" name="buy-btn" @click="$parent.$emit('add', item)">Купить</button>
        </div>
    </template>

    <template v-if="type == 'basket'">
        <div class="product-desc">
            <p class="product-title">{{ item.product_name }}</p>
            <p class="product-quantity">{{ item.quantity }}</p>
            <p class="product-single-price">{{ '$' + item.price }}</p>
        </div>
        <div class="right-block">
            <button name="del-btn" class="del-btn" @click="$emit('remove', item)">&times;</button>
        </div>
    </template>

    <template v-if="type === 'temp'">
        <div class="desc">
            <label >
                <input type="text" placeholder="Item name" v-model="newProduct.product_name" class="w-50">
            </label>
            <label >
                <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50">
            </label>
            <button class="buy-btn" 
                name="buy-btn"
                @click="createNew(newProduct)"
            >Добавить</button>
        </div>
    </template>
  </div>
</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                product_name: '',
                price: 0
            }
        }
    },
    props: {
        type: {
            type: String,
            default: 'catalog'
        },
        item: {
            type: Object
        }
    },
    methods: {
        createNew(item) {
            if (item.product_name && item.price) {
                this.$emit('addNewItem', item);
                this.newProduct = {
                    product_name: '',
                    price: 0
                }
            }
        }
    }
}
</script>

<style>

</style>