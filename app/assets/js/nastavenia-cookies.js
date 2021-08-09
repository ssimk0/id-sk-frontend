(function intCookies(){
    var gaCheckbox = document.getElementById("ga-cookies");
    if(window.localStorage.getItem('googleAnalytics') == 'true'){
        gaCheckbox.setAttribute("checked");
    }else{
        gaCheckbox.removeAttribute("checked");
    }
})();


var gaScriptSrc = document.createElement("script");
gaScriptSrc.type = "text/javascript";
gaScriptSrc.id = "ga-script-src";
gaScriptSrc.src = "https://www.googletagmanager.com/gtag/js?id=G-WR6TZ5RBNF";

var gaScript = document.createElement("script");
gaScript.type = "text/javascript";
gaScript.id = "ga-script"
gaScript.innerHTML = 
`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WR6TZ5RBNF');`;

function includeGa(){

    if(window.localStorage.getItem('googleAnalytics') == 'false'){
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(gaScript);
        head.appendChild(gaScriptSrc)
        window.localStorage.setItem('googleAnalytics', 'true');

    }else{
        (elem = document.getElementById("ga-script")).parentNode.removeChild(elem);
        (elem = document.getElementById("ga-script-src")).parentNode.removeChild(elem);
        window.localStorage.setItem('googleAnalytics', 'false');
    }

}

document.getElementsByClassName("save-cookie-settings")[0].onclick = function () { 
    includeGa();
    location.reload();
}