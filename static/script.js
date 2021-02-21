window.onload = function(){

    const inp = document.querySelector("input");
    const pre = document.querySelector("pre");
    let n = 0;
    let cd;

    const url = 'http://127.0.0.1:5000/';

    var s = "";
    req("cd");

    inp.addEventListener("keydown",(e)=>{
        if(e.keyCode==13){
            var txt = inp.value;
            if(txt=="cls"){
                s = "";
                n = 0;
                req("cd");
            }
            else{
                req(txt);
            }
            inp.value = "";
        }
    });

    function req(c){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                if(n==0){
                    s += json.out + "$ ";
                    cd = s;
                    n++;
                }
                else{
                    s += c + "\n" + json.out + "\n\n" + cd;
                }
                pre.textContent = s;

                var objDiv = document.querySelector(".box");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        };
        var data = JSON.stringify({"cmd": c});
        xhr.send(data);
    }

}

