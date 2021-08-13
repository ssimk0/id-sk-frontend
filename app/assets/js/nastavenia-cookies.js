//Init function 
var gaCheckbox = document.getElementById("ga-cookies");
var preferencesCheckbox = document.getElementById("preferences-cookies");

(function intCookies(){
    if(window.localStorage.getItem('googleAnalytics') == 'true'){
        if(gaCheckbox && !(window.getComputedStyle(gaCheckbox.nextElementSibling, ':after').getPropertyValue('opacity') == 1)){
            gaCheckbox.setAttribute("checked"); 
            }
    }else{
        if(gaCheckbox){
            gaCheckbox.removeAttribute("checked"); 
        }
    }
    if(window.localStorage.getItem('preferences') == 'true'){
        if(preferencesCheckbox && !(window.getComputedStyle(preferencesCheckbox.nextElementSibling, ':after').getPropertyValue('opacity') == 1)){
            preferencesCheckbox.setAttribute("checked", "checked"); 
            }
    }else{
        if(preferencesCheckbox){
            preferencesCheckbox.removeAttribute("checked"); 
        }
    }
})();

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