<template>
    <!-- 
    - https://github.com/jslim9413/encore-vue-pjt.git
    
    요구사항
    ############################################
    Vue Router 
    - 페이지이동 
    - 카드목록에서 카드를 선택했을 때 상세페이지로 이동 
    - 설치 : npm install vue-router@4   
    - src - router - index.js (config)
    - main.js : router 등록

    - 페이지 트랜지션 발생할려면 
    - <router-view/>
    - 기존 href 속성을 사용해서는 안된다. 
    - to 속성으로 href 대체
    - <a> -> <router-link>   : template
    - router.push(); : script 
    ////////////// 이벤트 버블링
    - click.stop , prevent
    ###########################################
    -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <router-link class="navbar-brand" :to="{ name : 'Home' }">Hanwha SW Camp 5th</router-link>
        
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{ name : 'Works'}">To-Work</router-link>
            </li>
        </ul>
    </div>
    </nav>

    <router-view />
</template>
  
<script>
</script>
  
<style>
</style>
