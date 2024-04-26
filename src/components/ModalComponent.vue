<template>
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="title"></slot>
                    </h5>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['model-close','model-delete'] , 
    setup(props, {emit} ) {
        // 부모(WorkList) 쪽으로 모달에서 발생된 이벤트 전달하는 역할(emit)
        const onClose = () => {
            emit('model-close');
        }
        const onDelete = () => {
            emit('model-delete'); 
        }
        return {
            onClose,
            onDelete
        }
    }
}
</script>

<style>
    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-dialog {
        background-color: white;
        width: 400px;
        max-width: 90%; /* Ensure modal doesn't exceed 90% of viewport width */
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 50%; /* Position from top edge */
        left: 50%; /* Position from left edge */
        transform: translate(-50%, -50%); /* Center the modal horizontally and vertically */
    }

    .modal-header {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        justify-content: center; /* Align content horizontally */
        align-items: center; /* Align content vertically */
    }

    .modal-title {
        margin: 0;
        justify-content: center; /* Align content horizontally */
        align-items: center; /* Align content vertically */
    }

    .modal-body {
        padding: 12px;
        text-align: center; /* Center-align text */
    }

    .modal-footer {
        padding: 12px;
        border-top: 1px solid #ddd;
        text-align: right;
    }
</style>