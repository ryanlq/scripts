// ==UserScript==
// @name        阿里云盘目录结构下载
// @namespace   Violentmonkey Scripts
// @match       *://*.aliyundrive.com/drive/*
// @grant       none
// @version     1.0
// @author      -
// @description 2023/2/2 12:15:16
// ==/UserScript==


(function() {
    'use strict';

    function get_root(){
        let root = document.querySelector("[data-key='root']")
        let current = root,root_path = "";
        while(current){
            console.log(current)
            let _label = current.getAttribute("data-label")
            //let  _key = current.getAttribute("data-key")
            root_path += _label

            if(current.lastChild.innerText == "›"){
                root_path += ">"
                current = current.nextElementSibling
            } else{
                current = false
            }
        }
        return root_path + "\r\n"
    }


    function get_sub_paths(){
        let sub_containers = document.querySelectorAll('.grid-card-container')
        let results = ""
        sub_containers.forEach(sc=>{
            let _title=sc.innerText
            if(_title){
                let matchs = _title.split("\n")
                results += matchs[0]
                results += "\r\n"
            }
        })
        return results
    }

    function download(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    function download_handler(){
        let root = get_root()
        let paths_str = root + get_sub_paths()
        download(root +'.txt',paths_str)
    }
    function create_button(){
        let button = document.createElement("button")
        button.innerText="下载目录结构"
        button.style.padding = "10px"
        button.style.position = "absolute"
        button.style.right = "50px"
        button.style.top = "50px"
        button.style.background = "#a32525d1"
        button.addEventListener("click",download_handler)

        document.body.appendChild(button)
    }
    create_button()

})();