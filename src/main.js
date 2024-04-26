import { createApp } from 'vue';
import router from './router';

// 서버기동 npm run serve

// import App from './App.vue'
// createApp(App).mount('#app')

// import App from './AppSecond.vue'
// createApp(App).mount('#app')

// import App from './AppHome.vue'
// createApp(App).mount('#app')

// import App from './AppIntro.vue' 
// createApp(App).mount('#app')

// import App from './AppContext.vue' 
// createApp(App).mount('#app')

// import App from './AppRouter.vue' 
// createApp(App).use(router).mount('#app')

// import App from './AppRead.vue' 
// createApp(App).use(router).mount('#app')

// import App from './AppToast.vue' 
// createApp(App).use(router).mount('#app')

// vuex 
// 
import App    from './AppVuex.vue' 
import store  from './store'
createApp(App).use(store).use(router).mount('#app')








