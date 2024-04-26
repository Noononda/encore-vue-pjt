<template>
    <div v-if="loading">
      Loading..
    </div>
    <form 
      v-else
      @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input
                        v-model="work.subject" 
                        type="text" 
                        class="form-control">
                        
                    <!-- subject null 입력시 동작하는 영역 -->
                    <div
                        v-if="subjectError" style="color : red"> 
                        {{ subjectError }}
                    </div>

                </div>
            </div>
            <!-- 수정에서 이동했을 때 보여져야함. -->
            <div v-if="editing" class="col-6" >
                <div class="form-group">
                    <label>Status</label>
                <div>
                <button 
                    class="btn"
                    :class="work.completed ? 'btn-success' : 'btn-danger'"
                    type="button"
                    @click="toggleWorkStatus">
                    
                    {{ work.completed ? 'Completed' : 'Incomplete' }} 
                </button>
                </div>
            </div>
        </div>

		
        <div class="col-12">
            <div class="form-group">
                <label>Content</label>
                <textarea 
                    v-model="work.content"
                    class="form-control" 
                    cols="30" rows="10"></textarea>
            </div>
            </div>
        </div>
      
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!workUpdated">

            {{ editing ? 'Update' : 'Create' }}
        
        </button>
        <button 
        class="btn btn-outline-dark ml-2"
        @click="moveToWorkList"
        >
            Cancel
        </button>
    </form>
    
    <Toast 
      v-if="showToast" 
      :message="toastMessage"
      :type="toastAlertType"
    />

</template>

<script>
import { useRoute , useRouter } from 'vue-router' ; 
import { ref , computed} from 'vue';
import axios        from '@/axios';
import _            from 'lodash' ; 
import Toast        from '@/components/ToastComponent.vue'
import { useToast } from '@/composables/toast';

// vuex add
import { useStore } from 'vuex' ; 

export default {
    components: {
        Toast
    },
    props: {
        editing: {
            type : Boolean,
            default: false 
        }
    },

    setup(props) {
        // 
        const store = useStore();
        console.log(">>> debug workform component , " , store.state);
        console.log(">>> debug workform component state showToast , " , store.state.showToast); 

        // 변수
        const loading = ref(false) ; 
        const router  = useRouter();
        const route   = useRoute();

        // 기본키값을 이용해서 수정페이지 화면에 데이터 출력 
        const work_id = route.params.id ; 

        const work    = ref({
            subject   : '' , 
            completed : false ,
            content   : ''
        });
        const copyWork  = ref(null); 

        const {
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast
        } = useToast();

        // subject 에 널값입력시 유효성 체크 
        const subjectError = ref('');

        // 함수
        const workUpdated = computed(() => {
            return !_.isEqual(work.value , copyWork.value);
        });
        // 서버통신을 통해서 키에 해당하는 객체를 정보를 가져올 예정 
        const getWork = async () => {
            console.log(">>>> debug getWork params.id , " , work_id) ; 
            try{
                // json-server
                // const res = await axios.get(`works/${work_id}`);
                // springboot 
                const res = await axios.get(`find/${work_id}`);
                work.value = { ...res.data };   
                copyWork.value = { ...res.data} ;   
                loading.value = false ; 
            } catch(err) {
                console.log("View getWork err , " , err) ;
                loading.value = true ;
                triggerToast("Something To Wrong" , 'danger');    
            }
        }
        // 등록일때는 호출되어서는 안됨!!!!
        if( props.editing ){
            getWork();
        }
        // 서버통신 통해서 데이터 수정 , 등록 
        const onSave = async () => {
            subjectError.value = '';
            if( !work.value.subject) {
                subjectError.value = 'Subject is required';
                return ; 
            }
            try{
                
                let res ; 

                const data = {
                    // springboot 통신에서는 사용하지 않음.
                    // id : Date.now(),
                    subject : work.value.subject,
                    content : work.value.content,
                    completed : work.value.completed
                } ; 

                if(props.editing) {
                    // 수정할때 사용할 부분
                    const res = await axios.put(`update` , {
                        id        : work_id, 
                        subject   : work.value.subject ,
                        completed : work.value.completed,
                        content   : work.value.content   
                    });
                    console.log(">>>>> onUpdate put res , " , res.data ); 
                    work.value = {...res.data}; 

                    router.push({
                        name : 'Works'
                    });
                    // triggerToast("Successfully Update!!" , 'info') ;     
                } else {
                    // Create .... json-server
                    // res = await axios.post('works' , data); 
                    
                    // springboot 
                    res = await axios.post('save' , data); 
                    
                    work.value.subject = '';
                    work.value.content = '';
                    console.log(">>>> " , res.data);
                    router.push({
                        name : 'Works'
                    });

                }

            } catch(err) {
                console.log("update err , " , err);
                // triggerToast("Something To Wrong" , 'danger');
            } 
        }
        
        const moveToWorkList = () => {
            router.push({
                name : 'Works'
            });
        }

        // status change
        const toggleWorkStatus = () => {
            console.log("work completed , " , work.value.completed ); 
            work.value.completed = !work.value.completed ;  
            console.log("work completed , " , work.value.completed );
        }


        return {
            onSave,
            moveToWorkList,
            loading,
            work,
            toggleWorkStatus,
            workUpdated,
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast,
            subjectError
        }
    }
    
}
</script>

<style>

</style>