setTimeout(() => {

    //event handle
    //feature carousel
    let owlBtns = document.querySelectorAll('.owl-nav button')
    owlBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            slideDetailShowPosition();
        })
    })
    let slideContents = document.querySelectorAll('.slide-content');
    slideContents.forEach(slide=>{
        let dtl = slide.querySelector('.slide-content__detail');
        let imgBx = slide.querySelector('.imgBx');
        let hoverEvent = new Event('mouseover');
        dtl.addEventListener('mouseenter', ()=>{
            
            imgBx.dispatchEvent(hoverEvent);
            console.log('end');

        })
    })

    //function
    slideDetailShowPosition = () => {
        let activeSlides = document.querySelectorAll('.active.owl-item .slide-content__detail');

        clearSlideDetaileShowPosition();
        for (let i = 0; i < activeSlides.length; i++) {
            if (i < Math.ceil(activeSlides.length / 2)) {
                activeSlides[i].classList.add('left');
            } else {
                activeSlides[i].classList.add('right');
            }
        }
    }

    clearSlideDetaileShowPosition = () =>{
        let slides = document.querySelectorAll('.slide-content__detail');
        console.log(slides.length)
        slides.forEach(slide=>{
            slide.classList.remove('left');
            slide.classList.remove('right');
        })
    }

    
    //function run
    slideDetailShowPosition();
    



}, 700)

clearActive = (objectName, activeName) => {
    objectName.forEach(item => {
        item.classList.remove(activeName)
    })
}
bodyScroll = (bool) => {
    document.body.style.overflow = bool ? '' : 'hidden';
}
overlayActive = (parentClassName) => {
    let isActive = true;
    let init = true;
    let overlay = getEle(parentClassName + ' .overlay__bg');
    getEle(parentClassName).addEventListener('click', () => {
        //Hơi hại não nhé
        if (init == true && isActive == true) { isActive = true; }
        else if (init == true && isActive == false) { isActive = true; }
        else if (init == false && isActive == false) { isActive == false; }

        overlay.classList.toggle('overlay-active', isActive);
        init = init === true ? false : true;
    })
    overlay.addEventListener('click', (e) => {
        isActive = false;
    })
    getEle(parentClassName + ' .overlay__close').addEventListener('click', () => {
        isActive = false;

    })

}

function showPassword(classParent) {
    let x = document.querySelector(`.${classParent} .password`);
    let y = document.querySelector(`.${classParent} .hide1`);
    let z = document.querySelector(`.${classParent} .hide2`);

    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}