setTimeout(() => {

    //event handle
    //feature carousel
    let owlBtns = document.querySelectorAll('.owl-nav button')
    owlBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            slideDetailShowPosition();
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

}, 500)

