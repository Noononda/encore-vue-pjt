<template>
    <form @submit.prevent="onSubmit">
        <div class="d-flex">
            <div class="flex-grow-1 mr-2">
                <input  type="text" 
                        v-model="work"
                        class="form-control"
                        placeholder="new work...">
            </div>    
            <div>
                <button class="btn btn-primary" type="submit">ADD</button>
            </div> 
        </div>
        <!-- v-show 널값입력시 메시지 출력 -->
        <div v-show="hasError" class="error">
            This Field can not be empty
        </div>

    </form> 
</template>

<script>
import {ref} from 'vue';

export default {
    emits: ["add-work"] , 
    setup(props, {emit}) {
        const work     = ref('');
        const hasError = ref(false);
        
        // emits : ['add-work'] 
        const onSubmit = () =>{
            console.log(">>>> submit event");
            console.log(">>>>" , work.value); 
            if(work.value === '') {
                hasError.value = true ; 
            } else {
                emit("add-work", {
                    idx : Date.now() ,
                    subject : work.value ,
                    completed : false 
                });
                hasError.value = false ;
                work.value = '';  
            }
        };

        return {
            work,
            hasError,
            onSubmit
        }

    }
}
</script>

<style>

</style>