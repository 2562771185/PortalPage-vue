import Router from 'vue-router'
import Vue from 'vue'
import page2 from "@/view/page2";
import page1 from "@/view/page1";
import page3 from "@/view/page3";


Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/page1',
            name:'page1',
            component: page1
        },
        {
            path:'/page2',
            name:'page2',
            component: page2
        },
        {
            path:'/page3',
            name:'page3',
            component: page3
        },
    ]
})
export default router;
