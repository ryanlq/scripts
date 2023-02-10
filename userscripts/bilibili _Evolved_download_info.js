// ==UserScript==
// @name         bilibili Evolved插件下载信息辅助
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  toast下载面板，保存下载文件和标题关联，以便重命名。
// @author       xdaoo
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const classes = `
       #x_get_pairs{position:absolute; top:100px; right:100px;padding:10px;background:red;color:#fff;cursor:pointer;z-index:9999999;}
       #x_get_pairs:hover{
          background:#e91e63;
       }
    `
    const customize_styles = document.createElement('style');
    customize_styles.innerText = classes
    const button = document.createElement('button');
    button.innerText = "Get download pairs！"
    button.id = "x_get_pairs"


function download(downfile,exa,type) {
    const tmpLink = document.createElement("a");
    const objectUrl = URL.createObjectURL(downfile);

    tmpLink.href = objectUrl;
    tmpLink.download = document.title+exa+'.'+type;
    document.body.appendChild(tmpLink);
    tmpLink.click();

    document.body.removeChild(tmpLink);
    URL.revokeObjectURL(objectUrl);
}


    button.addEventListener('click',(e)=>{
       const downloadcard = document.querySelector('.toast-card-message');
        if(downloadcard){
            const aes = downloadcard.querySelectorAll('a')
            let allfilenames = []
			let links = []
            aes.forEach(a=>{
                allfilenames.push({title:a.innerText,href:a.href.match(/.*\/(.*\.m4s).*/)[1]})
				links.push(a.href+'\r\n')
            })
            //const file = new File(JSON.stringify({result:allfilenames}), document.title+'.json');
            const file = new Blob([JSON.stringify({result:allfilenames})], {type : 'application/json'})
            download(file,'','json');
            //const linkfile = new File(JSON.stringify({result:allfilenames}), document.title+'.json');
            const linktexts = new Blob([links], {type : 'text/plain'})
            console.error(linktexts)
            download(linktexts,'下载链接','txt');
        }
    })
    document.body.appendChild(customize_styles)
    document.body.appendChild(button)
})();