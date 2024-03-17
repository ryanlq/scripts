// ==UserScript==
// @name        通义千问样式[edge黑暗模式下]
// @namespace   Violentmonkey Scripts
// @match       https://tongyi.aliyun.com/qianwen/*
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     1.0
// @author      -
// @description 2024/3/17 14:29:55
// ==/UserScript==


window.onload = function(){

    GM_addStyle('#BaseLayoutContent {background:#000 !important}')
    document.querySelector("textarea").parentElement.style.border = "2px solid rgb(255 0 0) "
  
  }