<template>
    <!-- 
    - https://github.com/jslim9413/encore-vue-pjt.git
    
    요구사항
    ############################################
    부모컴포넌트와 자식컴포넌트 사이에서 데이터 전송
    - setup(props, context) 
    - context.emit() => 부모에 데이터 전달 
    - props => 자식에게 데이터 전달 
    ###########################################
    -->
    <div class="container">
        <h2>Encore-Work List</h2>
        <!-- 검색기능 추가 -->
        <input  type="text"
                placeholder="Search...."
                class="form-control"
                v-model="searchText">
        <hr/>

        <!-- form -> WorkForm.vue 이동 -->
        <WorkForm @add-work="addWork" />

        <!-- 페이지 로딩시 추가되는 코드  -->
        <!-- <div v-if="!works.length" class="error">
            등록한 일정이 존재하지 않습니다.
        </div> -->

        <!-- 검색기능 추가하는 서치 바 -->
        <div v-if="!filterWorks.length" class="error"> 
            필터링 결과가 존재하지 않습니다.
        </div>    

        <WorkList   :works="filterWorks" 
                    @toggle-work="toggleWork"
                    @delete-work="deleteWork" /> 
      
  
    </div>
    
    <!--  
    npm i axios 
    import axios from 'axios' ; 
    axios.get();
    $.ajax();
    -->

</template>
  
<script>
    
import { ref , computed } from 'vue';
// form 
import WorkForm  from "./components/WorkForm.vue" ; 
// list
import WorkList  from "./components/WorkList.vue" ; 
export default {
    components : {
        WorkForm,
        WorkList
    },
    setup() {
        const works      = ref([]);
        const searchText = ref(''); 

        const addWork = (work) => {
            console.log(">>>>>>>>>> emit work  , " , work); 
            works.value.push(work); 
        }

        const deleteWork = (index) => {
            console.log(`deletework click ${index}`);
            works.value.splice(index, 1); 

        }

        const toggleWork = (index) => {
            console.log("work completed " , works.value[index].completed);
            works.value[index].completed =  !works.value[index].completed ;
            console.log("work completed " , works.value[index].completed);
        }
        // javascript - filter() , includes()
        const filterWorks = computed(() => {
            if(searchText.value) {
                return works.value.filter(work =>{
                    return work.subject.includes(searchText.value) ; 
                })
            }
            return works.value ; 

        }) ; 
            
        

        return {
            works,
            deleteWork,
            addWork,
            toggleWork,
            searchText,
            filterWorks
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
