document.addEventListener("DOMContentLoaded", function(event) { 
    //Init function 
    var gaCheckbox = document.getElementById("ga-cookies");
    var preferencesCheckbox = document.getElementById("preferences-cookies");

    (function intCookies(){
        //Check if Google Analytics exist in localStorage if not create key and add default value to true
        if(!(window.localStorage.getItem('googleAnalytics'))){window.localStorage.setItem('googleAnalytics', 'true');}

        if(window.localStorage.getItem('googleAnalytics') == 'true'){
            addGa();
            if(gaCheckbox && !(window.getComputedStyle(gaCheckbox.nextElementSibling, ':after').getPropertyValue('opacity') == 1)){
                gaCheckbox.setAttribute("checked"); 
                }
        }else{
            if(gaCheckbox){
                gaCheckbox.removeAttribute("checked"); 
            }
        }

        if(window.localStorage.getItem('preferences') == 'true'){
            addPreferences();
            if(preferencesCheckbox && !(window.getComputedStyle(preferencesCheckbox.nextElementSibling, ':after').getPropertyValue('opacity') == 1)){
                preferencesCheckbox.setAttribute("checked", "checked"); 
                }
        }else{
            if(preferencesCheckbox){
                preferencesCheckbox.removeAttribute("checked"); 
            }
        }
    })();

    function addGa(){
        //Google analytics scripts
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

        var head = document.getElementsByTagName('head')[0];
        head.appendChild(gaScript);
        head.appendChild(gaScriptSrc)
    }

    function removeGa(){
        var headGaScript = document.getElementById("ga-script");
        if(headGaScript){
            (elem = headGaScript).parentNode.removeChild(elem);
            (elem = document.getElementById("ga-script-src")).parentNode.removeChild(elem);
        }
    }

    function addPreferences(){
        window.localStorage.setItem('preferences', 'true');
    }

    function removePreferences(){
        window.localStorage.setItem('preferences', 'false'); 
    }

    //Handle save cookie preferencies button
    var saveCookieButton = document.getElementsByClassName("save-cookie-settings")[0];
    if(saveCookieButton){
        
        saveCookieButton.onclick = function () { 
        if(window.getComputedStyle(gaCheckbox.nextElementSibling, ':after').getPropertyValue('opacity') == 1){
            window.localStorage.setItem('googleAnalytics', 'true');
        }else{
            window.localStorage.setItem('googleAnalytics', 'false'); 
        }

        if(window.getComputedStyle(preferencesCheckbox.nextElementSibling, ':after').getPropertyValue('opacity') == 1){
            window.localStorage.setItem('preferences', 'true');
        }else{
            window.localStorage.setItem('preferences', 'false'); 
        }
        location.reload();
        }
    }
});