import Router from 'vue-router'
import Vue from 'vue'
import autoDiv from "@/view/auto-div.vue";
import test from "@/view/test.vue";


Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name:'autoDiv',
            component: autoDiv
        },
         {
            path:'/test',
            name:'test',
            component: test
        },
    ]
})
export default router;
