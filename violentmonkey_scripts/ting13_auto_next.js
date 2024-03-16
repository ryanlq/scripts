// ==UserScript==
// @name        ting13.com自动下一集
// @namespace   Violentmonkey Scripts
// @match       *://*.ting13.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 2023/2/3 18:56:05
// ==/UserScript==


(function() {
    'use strict';
    window.onload = function(){
        //do something
      let nextbtn = document.querySelector('#nexturl')
      setTimeout(()=>nextbtn.click(),7000)
    }
})();