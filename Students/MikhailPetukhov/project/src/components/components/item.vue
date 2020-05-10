<template>
	<div :class="type ==='catalog' || type === 'temp' ? 'product-item' : 'cart-item'">
        <img :src="type==='temp' ? placeHolder :  item.image_link ">

		<template v-if="type == 'catalog'">
            <div class="desc">
                <h1>{{item.name}}</h1>
                <h1>{{item.style}}</h1>
                <p>{{item.price}}</p>
                <button class="buy-btn" name="buy-btn" @click="$parent.$emit('add', item)">
                    Купить
                </button>
            </div>             
		</template>	

		<template v-if="type == 'basket'">        
            <div class="product-desc">
                <p class="product-title">{{item.name}}</p>
                <p class="product-quantity">{{item.quantity}}</p>
                <p class="product-single-price">{{item.price}}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$emit('remove', item)">&times;</button>
            </div>                      		
		</template>

        <template v-if="type === 'temp'">
            <div class="desc">
                <label>
                    <input type="text" placeholder="name" v-model="newProduct.name" class="w-100">
                </label>
                <label>
                    <input type="text" placeholder="style" v-model="newProduct.style" class="w-100">
                </label>
                <label>
                    <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50">
                </label>
                <button class="buy-btn" name="buy-btn" @click="createNew(newProduct)">
                    Добавить
                </button>
            </div>             
        </template> 
	</div>	
</template>

<script>
	export default {
        
		data() {
            return {
                newProduct: {
                    name: '',
                    style: '',
                    price: 0,
                    image_link: "https://placehold.it/300x200",
                    },
                placeHolder: "https://placehold.it/300x200",
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
			// add() {
			// 	this.$parent.$parent.$refs.basket.add(this.item);
			// }
            createNew(item) {
                if (item.name && item.price) {
                    this.$emit('addNewItem', item);
                    this.newProduct = {
                        name: '',
                        style: '',
                        price: 0,
                        image_link: "https://placehold.it/300x200",
                    }
                }
            }            
		},

	}
</script>

<style>
	
</style>