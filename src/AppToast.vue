<template>
    <!-- 
    - https://github.com/jslim9413/encore-vue-pjt.git
    
    요구사항
    ############################################
    - 알림(Toast)컴포넌트 작성 
    - 애니매이션(fade-in, fade-out, slide)
    - 전역형식으로 
    - 컨포넌트의 라이프사이클에 대해서     
    ############################################
    -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <router-link class="navbar-brand" :to="{ name : 'Home' }">Hanwha SW Camp 5th</router-link>
        
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{ name : 'Works'}">To-Work</router-link>
            </li>
        </ul>
    </div>
    </nav>

    <div class="container">
        <router-view />
    </div>
    
</template>
  
<script>
</script>
  
<style>
</style>
