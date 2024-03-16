// ==UserScript==
// @name        树莓派-cpolar.com
// @namespace   Violentmonkey Scripts
// @match       https://dashboard.cpolar.com/status*
// @grant       none
// @version     1.1
// @author      xdaoo
// @description 2024/2/22 15:58:16
// ==/UserScript==



    function _get_x(){
      let tbody = document.querySelector("table.table-sm tbody")
      let trs = tbody.querySelectorAll("tr")
      let results = []
      trs.forEach(tr=>{
        let td = tr.querySelector("td")
        let t = tr.querySelector("td").innerText
        let a = tr.querySelector("a").innerText
        if("ssh" == t) {
          let address,port
          let rs = a.match(/(.*):(\d+)$/)
          if(rs) {
            address = rs[1] ;
            port = rs[2];
          }
          results.push([t,address,port])
        } else{
          results.push([t,a])
        }
      })
      return results
    }

    function _do_tip_x(){
      const results = _get_x()
      let _tip = document.createElement("div")
      _tip.style = "padding:10px;position: fixed;inset: 0px;max-width: 80vw;  max-height: 80dvh;margin: auto;    background-color: black; border: solid 4px #fff;"
      start = ''
      _tip.innerText = results.reduce((accumulator,r)=> {
        if(r.length == 3) return accumulator+'\n'+r[0]+' ：  '+r[1]+'['+r[2]+']'
        else return accumulator+'\n'+r.join(':')
      } , start)
      document.body.append(_tip)
    }




window.onload = (event) => {
  console.log("page is fully loaded");
  _do_tip_x()
};
