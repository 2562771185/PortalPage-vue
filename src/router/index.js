import Router from 'vue-router'
import Vue from 'vue'
import page1 from "@/view/page1";



Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name:'page1',
            component: page1
        },
    ]
})
export default router;
