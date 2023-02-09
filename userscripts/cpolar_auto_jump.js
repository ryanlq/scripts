// ==UserScript==
// @name        cpolar自动跳转
// @namespace   Violentmonkey Scripts
// @match       *://dashboard.cpolar.com/status?*
// @grant       none
// @version     1.0
// @author      xdaoo
// @description 2023/2/2 12:15:16
// ==/UserScript==


(function() {
    'use strict';
    window.onload = function(){

        let navs = {
            "Alist":[],
            "apache":[],
            "cpolarpanel":[],
            "ssh":'',
        }

        const table = document.querySelector(".table-sm")
        const trs = table.querySelector('tbody').querySelectorAll("tr")
        let names = [];
        trs.forEach(tr=>{
            const name = tr.querySelector('td').innerText
            const url = tr.querySelector('a').href
            if(name == "ssh") {
                const params = url.replace("tcp://",'').split(":")
                navs.ssh = params[0]+ " -p "+ params[1]
            } else {
                url.includes("http://")?navs[name].http = url :navs[name].https = url
            }
        })

        const actionid = window.location.href.replace('https://dashboard.cpolar.com/status?','')


        switch(actionid){
            case "1":
                window.location.href = navs.Alist.http
                break;
            case "2":
                window.location.href = navs.Alist.https
                break;
            case "3":
                window.location.href = navs.apache.http + "/check.php"
                break;
            case "4":
                window.location.href = navs.apache.https + "/check.php"
                break;
            case "5":
                window.location.href = navs.cpolarpanel.http
                break;
            case "6":
                window.location.href = navs.cpolarpanel.https
                break;
            case "7":
                document.querySelector("#nav").append(navs.ssh)
                break;
        }
    }

})();