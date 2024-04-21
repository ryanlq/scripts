// ==UserScript==
// @name         search-result-filter
// @namespace    xdaoo
// @version      1.2
// @description  搜索引擎过滤
// @match          https://*.google.com/search*
// @match          https://*.google.com.hk/search*
// @match          https://*.bing.com/*
// @match          https://*.baidu.com/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    window.onload = function(){

        
        const blocklist = [
            "csdn.net",
            "cloud.tencent.com",
            "linux.do", //"很多内容需要登录，但只能邀请注册!"
            "zhuanlan.zhihu.com" //"经常要验证或登录!"
        ]
        
        const blockliststr = ' -site:' + blocklist.join(' -site:')
        function getSearchInput(engine){
            if(engine == "bing"){
                return  document.querySelector('#sb_form_q') ||document.querySelector('#sb_form_go') || document.querySelector('.b_searchboxSubmit')  ;
            }
            if(engine == "google"){

                return document.querySelector('textarea[name="q"]');
            }
            if(engine == "baidu"){

                return document.querySelector('#kw');
            }
            return null
        }
        const searchEngine = window.location.hostname.replaceAll(/(www)|(\.com)|(\.hk)|(\.tw)|(cn\.)|(\.)/g,'')
        const searchBtn = document.querySelector('button[type="submit"]') 
                        || document.querySelector('input[type="submit"]')
                        || document.querySelector('#su')
        const searchInput = getSearchInput(searchEngine)
        searchInput.value = searchInput.value.replace(blockliststr,'')

        searchBtn.addEventListener('mousedown', (e)=> {
            const filteredKeyword =  searchInput.value + blockliststr
            searchInput.value = filteredKeyword
        },{passive:true})
        document.body.addEventListener('keydown', (e)=> {
            if (e.keyCode === 13) {
                const filteredKeyword =  searchInput.value + blockliststr
                searchInput.value = filteredKeyword
            }
        },{passive:true})
    }
})();