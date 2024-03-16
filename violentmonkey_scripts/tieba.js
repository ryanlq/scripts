// ==UserScript==
// @name        百度贴吧样式[edge黑暗模式下]
// @namespace   Violentmonkey Scripts
// @match       https://tieba.baidu.com/*
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     2.0
// @author      xdaoo
// @description 2024/2/27 13:22:41
// ==/UserScript==

window.onload = function(){
    GM_addStyle('.j_thread_list {background-color:#000 !important}')
    GM_addStyle('.main {width: 100% !important}')
    GM_addStyle('.aside {display: none !important}')
    GM_addStyle('.fye2ghg {display: none !important}')
    GM_addStyle('.mediago-ad-wrapper {display: none !important}')
  
  
  
    // close_btn j_click_close
    // document.querySelector(".close_btn j_click_close")
  }
  
  