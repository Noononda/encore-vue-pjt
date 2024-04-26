<template>
    <!-- 
    - https://github.com/jslim9413/encore-vue-pjt.git
    
    요구사항
    ############################################
    - 최초 페이지 로딩시 입력된 work 가 없습니다
    - 배열의 길이(length)를 체크 - v-if
    ############################################
    - 카드 목록에 버튼(delete) - 이벤트 버블링 생각이 필요
    -->
    <div class="container">
        <h2>Encore-Work List</h2>
        
        <!-- form -> WorkForm.vue 이동 -->
        <WorkForm />

        <!-- 페이지 로딩시 추가되는 코드  -->
        <div v-if="!works.length" class="error">
            등록한 일정이 존재하지 않습니다.
        </div>

        <!-- vue v-for(반드시 기본키를 필요로함!!!) -->
        <div class="card mt-2"
            v-for="(work,index) in works"
            :key="work.id">
            <div class="card-body p-2 d-flex align-items-center">
                <div class="form-check flex-grow-1">
                    <input  type="checkbox"
                            class="form-check-input"
                            v-model="work.completed"> 
                    
                    <label  class="form-check-label"
                            :class="{ work : work.completed }">
                        {{ work.subject }}        
                    </label>
                </div>
                <!-- 삭제를 위한 버튼 추가 -->
                <div> 
                    <button 
                        class="btn btn-danger btn-sm"
                        @click="deleteWork(index)">Delete</button>
                </div>
            </div>
        </div>
      
  
    </div>
    
    <!--  
    npm i axios 
    import axios from 'axios' ; 
    axios.get();
    $.ajax();
    -->

</template>
  
<script>
    
    import {ref} from 'vue';
    import WorkForm  from "./components/WorkForm.vue" ; 
    export default {
        components : {
            WorkForm
        },
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

            const deleteWork = (index) => {
                console.log(`deletework click ${index}`);
                works.value.splice(index, 1); 

            }
            return {
                onSubmit,
                work,
                works,
                toggle,
                onToggle,
                hasError,
                deleteWork
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
  