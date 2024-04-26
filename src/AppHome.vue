<template>
  
  <!-- v-show , v-if , v-else -->
  <!-- 
  <div v-show="toggle">true</div>  
  <div v-show="!toggle">false</div> 
  <div v-if="toggle">true</div>  
  <div v-else>false</div>
  <button @click="onToggle">Toggle</button>
  -->
  
  <div class="container">
    <h2>Encore-Work List</h2>
    <form  @submit.prevent="onSubmit">
        <div class="d-flex">
            <div class="flex-grow-1 mr-2">
                <input  type="text" 
                        class="form-control"
                        placeholder="new work..."
                        v-model="work" >
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
    <!-- vue v-for(반드시 기본키를 필요로함!!!) -->
    <div class="card mt-2"
         v-for="work in works"
         :key="work.id">
        <div class="card-body p-2">
            <div class="form-check">
                <input  type="checkbox"
                        class="form-check-input"
                        v-model="work.completed"> 
                
                <label  class="form-check-label"
                        :class="{ work : work.completed }">
                    {{ work.subject }}        
                </label>
                
            </div>
        </div>
    </div>
    

  </div>
</template>

<script>
import {ref} from 'vue';

export default {
    setup() {
        const work     = ref('');
        const works    = ref([]);
        const toggle   = ref(false);
        const hasError = ref(false);

        const onToggle = () => {
            toggle.value = !toggle.value ; 
        }

        const onSubmit = () =>{
            console.log(">>>> submit event");
            console.log(">>>>" , work.value); 
            if(work.value === '') {
                hasError.value = true ; 
            } else {
                works.value.push({
                    idx : Date.now() ,
                    subject : work.value ,
                    completed : false 
                });
                hasError.value = false ;
                work.value = '';  
            }
        }
        return {
            onSubmit,
            work,
            works,
            toggle,
            onToggle,
            hasError

        }
    }
    
}
</script>

<style>
    .error {
        color : red ; 
    }

    .work {
        color : green ;
        text-decoration: line-through ; 
    }
</style>
