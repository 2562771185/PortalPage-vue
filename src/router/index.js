import Router from 'vue-router'
import Vue from 'vue'
import page2 from "@/view/page2";
import page1 from "@/view/page1";
import page3 from "@/view/page3";
import pagemap from "@/view/pagemap";
import page5 from "@/view/page5";
import page6 from "@/view/page6";
import page7 from "@/view/page7.vue";
import page8 from "@/view/page8.vue";
import projectCardPage from "@/view/project-card-page.vue";


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
        {
            path:'/page7',
            name:'page7',
            component: page7
        },
        {
            path:'/page8',
            name:'page8',
            component: page8
        },
        {
            path:'/project-card-page',
            name:'project-card-page',
            component: projectCardPage
        },
    ]
})
export default router;
