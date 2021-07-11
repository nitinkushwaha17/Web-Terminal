// window.onload = function(){

    const inp = document.querySelector("input");
    const pre = document.querySelector("pre");
    let n = [];
    let cd;

    const url = 'http://127.0.0.1:5000/';

    var s = "";
    req("cd");

    var tab=1;
    var tab_text = [];
    var e_close = [];
    var e_click = [];

    inp.addEventListener("keydown",(e)=>{
        if(e.keyCode==13){
            var txt = inp.value;
            if(txt=="cls"){
                tab_text[tab] = "";
                n[tab] = 0;
                req("cd");
            }
            else{
                req(txt);
            }
            inp.value = "";
        }
    });

    const plus = document.querySelector("#plus");
    plus.addEventListener("click", function(){
        // let tb = document.createElement(div);

        // tb(p);
        // p.textContent = `tab ${tabs.length()}`;
        // let span = tb.createElement(span);
        // span.textContent = "&Cross;";

        let tb = document.querySelector(".ctab");
        tb.innerHTML+=`<div class="tab">
            <p>tab ${tab_text.length}</p>
            <span>&Cross;</span>
        </div>`;

        tab = tab_text.length;
        clickTabs();
        crossEvent();
        toggleActive(tab);
        req("cd");
        inp.focus();
    });

    function handleClickTabs(e,i){
        tab = i+1;
        console.log(tab);
        handle_tab();
        toggleActive(tab);
        inp.focus();
    }

    function clickTabs(){
        const tabs = document.querySelectorAll(".tab p");
        tabs.forEach((element, index) => {
            element.addEventListener("click",
                e_click[index] = handleClickTabs.bind(null, element, index));
        });
    }

    clickTabs();

    function handle_tab(){
        pre.textContent = tab_text[tab];
        console.log(tab);
    }

    function handleText(str, c){
        
        if(!n[tab] || n[tab]==0){
            n[tab]=0;
            s = str + "$ ";
            cd = s;
            n[tab]++;
            tab_text[tab] = "";
            // console.log("ntab");
        }
        else{
            s = c + "\n" + str + "\n\n" + cd;
        }

        tab_text[tab] += s;
        console.log(tab_text[tab]);
        handle_tab();

        var objDiv = document.querySelector(".box");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    function req(c){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                handleText(json.out, c);
            }
        };
        var data = JSON.stringify({"cmd": c});
        xhr.send(data);
    }

    function re(){
        const tabs = document.querySelectorAll(".tab p");
        const cross = document.querySelectorAll(".tab span");

        tabs.forEach(function (e,i){
            e.removeEventListener("click", e_click[i]);
        });
    
        cross.forEach(function (e,i){
            e.removeEventListener("click", e_close[i]);
        });
    }

    function closeTab(e,i){
        re();

        e.parentNode.remove();
        tab_text.splice(i+1, 1);
        console.log(tab_text);
        n.splice(i+1, 1);
        console.log(i+1);
        console.log(tab_text.length);

        if(i+1 == tab){
            if(tab == tab_text.length){
                tab--;
            }
        }
        else if(i+1<tab){
            tab--;
        }
        

        // if(i+1==tab_text.length){
        //     console.log(i);
        //     console.log(`---${tab}---`);
        //     if(tab==i+1){
        //         pre.textContent = tab_text[i];
        //         tab--;
        //         toggleActive(i);
        //         console.log(`---${tab}---`);
        //     }
        //     // console.log(tab_text[tab]);
        // }
        // if(i+1<tab){
        //     tab--;
        // }
        reorderTabs();
        handle_tab();
        clickTabs();
        crossEvent();
        toggleActive(tab);
        inp.focus();

        // const cross = document.querySelectorAll(".tab span");
        // cross.forEach((e)=>{
            
        // });

        // crossEvent();
    }

    function crossEvent(){
        const cross = document.querySelectorAll(".tab span");
    
        cross.forEach(function (e,i){
            e.addEventListener("click",                 //[bug] this event listener is not removed
                e_close[i] = closeTab.bind(null,e,i));
        });
    }
    
    function reorderTabs(){
        const tab_p = document.querySelectorAll(".tab p");
        tab_p.forEach((e,i)=>{
            e.textContent = `tab ${i+1}`;
        }
    )};

    function toggleActive(t){
        const tb = document.querySelectorAll(".tab");

        tb.forEach((e,i)=>{
            if(e==tb[t-1]){
               e.classList.add("active");
            }
            else{
                e.classList.remove("active");
            }
        });
    }

// }
