// ==UserScript==
// @name        bing搜索广告去除
// @namespace   Violentmonkey Scripts
// @match       https://cn.bing.com/search*
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     1.0
// @author      -
// @description 2024/3/16 12:35:09
// ==/UserScript==

window.onload = function(){

  const items = document.querySelectorAll(".b_algo")
  items.forEach(item=>{
    if(!item.firstChild.classList.contains("tpcn"))
      item.style = "display:none !important";
  })
  
}
  
  