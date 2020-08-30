function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("insert");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("insert");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeHTML();



getEle = (ele) =>{
    return document.querySelector(ele);
}

getEles = (ele) =>{
    document.querySelectorAll(ele);
}
clearActive = (objectName, activeName)=>{
    objectName.forEach(item=>{
        item.classList.remove(activeName)
    })
}
bodyScroll = (bool) =>{
    document.body.style.overflow = bool ? '' : 'hidden';
}
overlayActive = (parentClassName) =>{   
        let isActive = true;
        let init = true;
        let overlay = getEle(parentClassName+ ' .overlay__bg');
        getEle(parentClassName).addEventListener('click', ()=>{
            //Hơi hại não nhé
            if (init == true && isActive == true) { isActive = true; }
            else if(init == true && isActive == false){ isActive = true; }
            else if(init == false && isActive==false){ isActive == false; }
            
            overlay.classList.toggle('overlay-active', isActive);
            init = init===true ? false : true;
        })
        overlay.addEventListener('click', (e)=>{
            isActive=false;
        })
        getEle(parentClassName+ ' .overlay__close').addEventListener('click', ()=>{
            isActive = false;

        })
        
}

function showPassword(classParent){
    let x = document.querySelector(`.${classParent} .password`);
    let y = document.querySelector(`.${classParent} .hide1`);
    let z = document.querySelector(`.${classParent} .hide2`);
    
    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else{
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}
