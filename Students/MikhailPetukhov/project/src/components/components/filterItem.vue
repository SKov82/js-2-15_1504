<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="str">
        <button class="btn-search" @click.prevent="$emit('search', str)">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
	export default {
		data() {
			return {
				str: ''
			}
		}
	}
	
</script>

<style>
	
</style>