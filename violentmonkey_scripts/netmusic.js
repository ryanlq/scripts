// ==UserScript==
// @name        网易云音乐样式[edge黑暗模式下]
// @namespace   Violentmonkey Scripts
// @match       https://music.163.com/*
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     1.6
// @author      xdaoo
// @description 2024/3/2 19:36:19
// ==/UserScript==

window.onload = function(){

    GM_addStyle('.g-bd4 {background:#000 !important}')
    GM_addStyle('.m-table th, .m-table th .wp, .m-table td, .m-table .ply, .m-table .mv, .m-table .icn, .m-info .edit {background-color:#000 !important}')
    GM_addStyle('.u-btn2, .u-btn2 i, .u-btn2 .icn, .u-btni, .u-btni i, .u-tag, .u-tag i, .u-btni-addply .ply {background:#000 !important}')
      
    
    // GM_addStyle('.icn-add,.icn-fav,.icn-share,.icn-dl {padding: 1px; background-color:#ff0303 !important;}')
  
    let t = document.querySelector('table')
  
    t.style.background = "#000"
  
  
  }