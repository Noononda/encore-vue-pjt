<template>

    <!-- vue v-for(반드시 기본키를 필요로함!!!) -->
    <div    class="card mt-2"
            v-for="(work,index) in works"
            :key="work.id">
        
        <div    class="card-body p-2 d-flex align-items-center"
                style="cursor : pointer"
                @click="readWork(work.id)">
            <div class="form-check flex-grow-1">
                <input  type="checkbox"
                        class="form-check-input"
                        :value="work.completed"
                        @change="toggleWork(index , $event)"
                        @click.stop>   
                
                <label  class="form-check-label"
                        :class="{ work : work.completed }">
                    {{ work.subject }}        
                </label>
            </div>
            
            <!-- 삭제를 위한 버튼 추가 -->
            <!--                         
            <div> 
                <button 
                    class="btn btn-danger btn-sm"
                    @click.stop="deleteWork(index)">Delete</button>
            </div>
            -->
            <div> 
                <button 
                    class="btn btn-danger btn-sm"
                    @click.stop="openModal(work.id)">Delete</button>
            </div>

        </div>
        
    </div>

    <!-- 모달추가 -->
    <teleport to="#encore">
        <Modal 
                v-if="showModal"
                @model-close="closeModal"
                @model-delete="deleteWork"
        />
    </teleport>
    <!--     
    <teleport to="#encore">
        <div>코드 이동 테스트</div>
    </teleport> 
    -->

</template>

<script>
/*
props 사용시 주의점 
- One Way Data Flow(부모->자식 데이터전달 X)
- 그래서 checkbox 에서 completed 자식에서 변경해서는 안됨.
- 코드 수정이 필요한데
- 데이터를 수정할려면 다시 부모에게 데이터 전달 
*/
import { useRouter } from 'vue-router' ; 
// import Modal         from '@/components/ModalComponent.vue'; 
// teleport - slot 
import Modal         from '@/components/DeleteModal.vue'; 
import {ref}         from 'vue' ; 

export default {
    components: {
        Modal
    },
    props: {
        works: {
            type: Array,
            required: true 
        }
    },
    emits: ["toggle-work","delete-work"],
    setup(props, {emit}) {
        
        // 모달 처리를 위한 변수 선언 , 삭제 카드목록 객체의 id 
        const showModal    = ref(false); 
        const workDeleteId = ref(null) ;
        
        const openModal = (id) =>{
            console.log("debug openModal id >>>> , " , id);
            showModal.value = true ; 
            workDeleteId.value = id ;
        }
        const closeModal = () =>{
            showModal.value = false ;  
        }


        const toggleWork = (index , event) => {
            console.log(">> toggleWork target , " , event.target); 
            console.log(">> toggleWork target checked , " , event.target.checked); 

            console.log(">> toggleWork index , " , index) ; 
            emit("toggle-work" , index , event.target.checked);  
        }

        // 모달구현으로 인해서 코드 수정 불가피하다. 
        const deleteWork = () => {
            emit("delete-work" , workDeleteId.value); 
            showModal.value = false ; 
            workDeleteId.value = null ;
        }

        const router = useRouter();
        const readWork = (work_id) =>{
            // window.alert("readWork >>>> id , "+work_id) ;
            // path
            //router.push("/works/"+work_id); 
            // name
            router.push({
               name : "Work",
               params : {
                   id : work_id   
               }

            }); 
        }
        return {
            toggleWork,
            deleteWork,
            readWork,
            showModal,
            closeModal,
            openModal
        }
    
    }
}

</script>

<style>

</style>