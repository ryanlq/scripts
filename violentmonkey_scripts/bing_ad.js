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

    const ad = document.querySelector(".b_ad")
    GM_addStyle('.b_ad {display:none !important;}')
  
    //检测到b_ad样式修改，bing会将b_ad节点设为空，重新渲染一个正常的节点。
    if(ad.children[0] && ad.children[0].children.length  == 0)
        ad.nextSibling.style = "display:none !important"
  }
  
  