import Router from 'vue-router'
import Vue from 'vue'
import page2 from "@/view/page2";
import page1 from "@/view/page1";
import page3 from "@/view/page3";
import pagemap from "@/view/pagemap";
import page5 from "@/view/page5";
import page6 from "@/view/page6";


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
        {
            path:'/page4',
            name:'page-map',
            component: pagemap
        },
        {
            path:'/page5',
            name:'page5',
            component: page5
        },
        {
            path:'/page6',
            name:'page6',
            component: page6
        },
    ]
})
export default router;
