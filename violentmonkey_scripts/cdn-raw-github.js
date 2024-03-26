// ==UserScript==
// @name        raw.githubusercontent.com直连引用
// @namespace   Violentmonkey Scripts
// @match       https://raw.githubusercontent.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 2024/3/26 12:08:27
// ==/UserScript==

function tip(){
    const div = document.createElement("div")
    const a = document.createElement("a")
    div.textContent = "cdn引用地址："
    a.textContent  = a.href = window.location.href.replace('raw.githubusercontent.com','cdn.jsdelivr.net/gh').replace("/main/","@main/")
    div.appendChild(a)
    div.style = "position:fixed;top:0%;left:0%;background-color: #3d3d3d;padding:10px; width: 100%;text-align: center;"
    document.body.appendChild(div)
    // setTimeout(()=>div.remove(), 2000);
  }
  
  tip()