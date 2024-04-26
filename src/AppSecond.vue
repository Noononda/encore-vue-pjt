<template>
  <div class="container">
    <h2>양방향 바인딩(script -> template , template -> script)</h2>  
    <div :class="className">{{ name }}</div>
    <input :type="type" v-model="name">  
    <button 
        class="btn btn-info"
        @click="onSubmit">Click</button>
  </div>  
</template>

<script>
import {ref} from 'vue';
export default {
    setup() {
        let name      = ref("encore") ; 
        let className = ref('');
        let type      = ref('text'); 

        let changeClass = () => {
            className.value = 'name' ;
            type.value = 'text' ; 
        }

        let onSubmit = () => {
            console.log(name.value); 
        }
        return{
            name,
            className,
            changeClass,
            type,
            onSubmit  
        }
    }
}
</script>

<style>
    .name {
        color : red ;
    }
</style>




