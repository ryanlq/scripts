// ==UserScript==
// @name        一刻相册
// @namespace   Violentmonkey Scripts
// @match       *://photo.baidu.com/*
// @grant       none
// @version     1.0
// @author      xdaoo
// @description 2023/2/3 18:56:05
// ==/UserScript==

//1800-2200 误删

(function() {
    'use strict';

    function start(){

      let allckbtns =document.querySelectorAll(".check-btn")
      allckbtns.forEach(ck=>{
        if(ck.style.display == "none") {
          ck.style.display = "block"
        }
      })
      allckbtns[0].click()


      let list = document.querySelectorAll(".photo-item")
      let length = list.length
      let pages = length/400

      if(pages % 1 > 0 ) pages = parseInt(pages) +1
      else pages = parseInt(pages)


      let startpage = 0

      function select_action(i){
        // let allchecked = document.querySelectorAll(".item-checked.check-btn.checked")
        // allchecked.forEach(al=>{
        //   al.click()
        // })
        const first = list[0].querySelector(".item-checked.check-btn")
        if(!first.classList.contains("checked")){
          first.classList.add("checked")
        }
        let start = i*400
        let end = (start+400)>length?length:(start+400)
        for(let i=start; i<end;i++){
          if(i == 0) continue;
          else list[i].querySelector(".item-checked.check-btn").click()
        }
        
        if(start >=400){
          first.click()
        }
      }


      let panel = document.createElement('div')
      panel.style = `
        position:fixed;
        top:30px;
        right:30px;
        background-color:#607d8b;
        padding:10px;
        display:flex;
        z-index: 9999;
          width: 300px;
          flex-wrap: wrap;
      `
      let item = document.createElement('div')
      item.classList.add('myitem')
      item.style = `
		border: 1px solid rgb(0 0 0);
		padding: 10px;
        backgound:#red;
        cursor:pointer;
        color:#fff
      `
      for(let i=0; i<pages ; i++){
        let _item = item.cloneNode(true)
        let end = (i*400+400)>length?length:(i*400+400)
        _item.innerText = (i*400)+" - "+ end
        panel.appendChild(_item)
        _item.addEventListener("click",function(e){
          // document.querySelectorAll(".myitem.selected").forEach(item=>item.classList.remove('selected'))
          if(_item.classList.contains('selected')) _item.classList.remove('selected')
          else _item.classList.add('selected')
          select_action(i)
        })

      }

      // let remove_btn = item.cloneNode(true)
      // let download_btn = item.cloneNode(true)
      // remove_btn.innerText = "删除"
      // download_btn.innerText = "下载"
      // remove_btn.classList.add("my_remove_btn")
      // download_btn.classList.add("my_download_btn")
      // const right_header = document.querySelector(".header-right")
      // right_header && right_header.querySelectorAll(".right-btn").forEach(rb=>{
      //   if(rb.innerText == '下载') {
      //     download_btn.addEventListener("click",e=>{
      //       rb.click()
      //     })
      //   }
      //   if(rb.innerText == '删除') {
      //     remove_btn.addEventListener("click",e=>{
      //       rb.click()
      //     })
      //   }
      // })
      // panel.appendChild(download_btn)
      // panel.appendChild(remove_btn)
      document.body.appendChild(panel)
    }
    window.onload = function(){
        //do something
        let _btn = document.createElement("button")
        _btn.style = `
                position:fixed;
        top:30px;
        right:30px;
        background-color:#607d8b;
        padding:10px;
        display:flex;
        z-index: 9999;
          width: 300px;
          flex-wrap: wrap;
        `
        _btn.innerText = "START"
        _btn.addEventListener("click",()=>{
          start()
          _btn.style = "display:none;"
        })

      let _style = document.createElement("style")
      _style.innerText = `
        .myitem:hover{
          background-color:#100f0f;
        }
      `

      document.body.appendChild(_style)
      document.body.appendChild(_btn)



    }
})();