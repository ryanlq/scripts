// ==UserScript==
// @name        知乎直接跳转
// @namespace   Violentmonkey Scripts
// @match       *://*.zhihu.com/*
// @grant       none
// @version     1.1
// @author      xdaoo
// @description 2023/2/17 16:02:47
// ==/UserScript==


(function(){
    window.onload = function(){
      let links = document.querySelectorAll("a[href]")
      links.forEach(link=>{
          if(link['href'] && link['href'].match(/https:\/\/link.zhihu.com\/\?target=/)){
              link.href = decodeURIComponent(link.href.replace("https://link.zhihu.com/?target=",""))
          }
      })
    }
  })()