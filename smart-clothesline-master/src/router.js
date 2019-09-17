import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Control from './views/Control.vue'
import About from './views/About.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/control',
            name: 'control',
            component: Control
        }
    ]
})

export default router