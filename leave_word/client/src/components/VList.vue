<template>
    <div>
        <div class="mb">
            <div class="list" v-for="content of contents" :key="content.id">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{content.title}}</h5>
                    <small>{{content.createdAt}}</small>
                </div>
                <p class="mb-1">
                    {{content.content}}
                </p>
                <footer class="text-right">
                    <small>赞（{{content.like_count}}）</small>
                    <small>回复（{{content.comment_count}}）</small>
                    <a href="">我要回复</a>
                </footer>
            </div>
        </div>

        <div class="mb">
            <ul class="pagination mb">
                <li class="page-item" :class="{'disabled': curPage == 1}" @click="list(Math.max(curPage - 1, 1))">
                    <span class="page-link"> &lt; </span>
                </li>

                <li class="page-item" v-for="p of pages" 
                    :class="{'active': p == curPage}" 

                    :key="p" @click="list(p)"                    >
                    <span class="page-link">{{p}}</span>
                </li>

                <li class="page-item" :class="{'disabled': curPage == Math.ceil(count / pageCount)}" @click="list(Math.min(curPage + 1, Math.ceil(count / pageCount)))">
                    <a class="page-link" href="#"> &gt; </a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            curPage: 1,     // 当前页
            pages: 3,       // 总页数
            pageCount: 2,   // 每页显示的条数
            count: 10,
            contents: []
        }
    },
    created(){
        this.list();
    },
    methods: {
        list(p){
            console.info(p);
            if(p == this.curPage) return;
            this.curPage = p || this.curPage;


            axios({
                method: 'get',
                url: '/api',
                params: {
                    curPage: this.curPage,
                    pageCount: this.pageCount,
                }
            }).then(rs => {
                if(rs.data.code){
                    this.count = rs.data.count;
                    this.contents = rs.data.data;
                }
            });
        }
    }
}
</script>

<style>

</style>
