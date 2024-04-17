// ==UserScript==
// @name         search-result-filter
// @namespace    xdaoo
// @version      1.0
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

        function getSearchInput(engine){
            if(engine == "bing"){
                return  document.querySelector('#sb_form_q');
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
        searchBtn.addEventListener('mousedown', (e)=> {
            const filteredKeyword =  searchInput.value + ' -site:csdn.net' + ' -site:linux.do'
            searchInput.value = filteredKeyword
        },{passive:true})
        document.body.addEventListener('keydown', (e)=> {
            if (e.keyCode === 13) {
                const filteredKeyword =  searchInput.value + ' -site:csdn.net' + ' -site:linux.do'
                searchInput.value = filteredKeyword
            }
        },{passive:true})
    }
})();