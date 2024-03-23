// ==UserScript==
// @name        bing搜索广告去除
// @namespace   Violentmonkey Scripts
// @match       https://cn.bing.com/search*
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     1.3
// @author      xdaoo
// @description 2024/3/16 12:35:09
// ==/UserScript==

window.onload = function(){

  GM_addStyle('.b_ad {display:none !important}')

  const items = document.querySelectorAll(".b_algo")
  items.forEach(item=>{
    if(!item.firstChild.classList.contains("b_tpcn"))
      item.style = "display:none !important";
  })
  
}
  
  