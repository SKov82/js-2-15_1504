<template>
  <div>
    <template v-if="type == 'catalog'">
        <div class="product-item">
            <img src="https://placehold.it/300x200" :alt="item.product_name">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button class="buy-btn" name="buy-btn" @click="$parent.$emit('add', item)">Купить</button>
            </div>
        </div>
    </template>

    <template v-if="type == 'basket'">
        <div class="cart-item">
            <img src="https://placehold.it/100x50" :alt="item.name">
            <div class="product-desc">
                <p class="product-title">{{ item.name }}</p>
                <p class="product-quantity">{{ item.quantity }}</p>
                <p class="product-single-price">{{ item.price }}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$emit('remove', item)">&times;</button>
            </div>
        </div>
    </template>
  </div>
</template>

<script>
export default {
    props: ['type', 'item'],
    methods: {
        
    }
}
</script>

<style>

</style>