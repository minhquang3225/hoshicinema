function QuangCarousel(isAuto, numImgShow, timePerImg, timeDelay, timeEffect, gapWidth) {
    const carouselSlide = document.querySelector('.carousel-slide')
    let carouselImages = document.querySelectorAll('.carousel-image');
    let carouselImgs = document.querySelectorAll('.carousel-image img')
    const carouselDots = document.querySelector('.carousel-dots');
    const dots = document.getElementsByClassName('dot');
    let widthContainer = document.querySelector('.carousel-container').offsetWidth;
    let headTitles = document.querySelectorAll('.carousel-image h2')


    let finishEvent = true;
    let slideRun;

    //button
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    //Counter
    let counter = 0;


    //Loại bỏ active khi đi đến slide cần

    //set lại chiều dài 

    carouselImages.forEach(imgBx => {
        imgBx.style.width = (widthContainer / numImgShow) + 'px'
        imgBx.style.padding = '0' + gapWidth + 'px'
    })
    carouselImgs.forEach(img => {
        img.style.width = (widthContainer / numImgShow) - (2 * gapWidth) + 'px';
    })
    headTitles.forEach(h => {
        h.style.width = (widthContainer / numImgShow) - (2 * gapWidth) + 'px';
    })
    const size = carouselImages[0].clientWidth;



    //Begin

    createDot(carouselImages.length)
    createClone(numImgShow);
    imageClick(true);

    carouselSlide.style.transform = 'translateX(' + (-size * (counter + numImgShow) + 'px');
    dots[counter].classList.toggle('active');
    carouselImages[counter + (numImgShow * 3 - 1) / 2].classList.toggle('active');
    scaleImage(true);
    startRun();
    titleMaker();

    //button listener
    nextBtn.addEventListener('click', () => {

        if (finishEvent != true) { return };
        finishEvent = false;
        carouselSlide.style.transition = `all ${timeEffect}s ease-in-out`;
        counter++;
        carouselSlide.style.transform = 'translate(' + (-size * (counter + numImgShow)) + 'px';

        removeDotActive();
        removeImageActive(true);

        carouselImages[counter + (numImgShow * 3 - 1) / 2].classList.toggle('active');            //Không để trong else nếu để thì lúc chuyển cuối -> đầu sẽ bị ngựng

        if (counter == carouselImages.length - numImgShow * 2) {
            carouselImages[(numImgShow * 3 - 1) / 2].classList.toggle('active');
        }

        if (counter < 0) {
            dots[dots.length + counter].classList.toggle('active');
        }
        if (counter < carouselImages.length - numImgShow * 2 && counter >= 0) {
            dots[counter].classList.toggle('active');
        }
        if (counter == carouselImages.length - numImgShow * 2) {
            dots[0].classList.toggle('active')
        }

        scaleImage(true);


    });
    prevBtn.addEventListener('click', () => {
        if (finishEvent != true) return;
        finishEvent = false;
        carouselSlide.style.transition = `all ${timeEffect}s ease-in-out`;
        counter--;
        carouselSlide.style.transform = 'translate(' + (-size * (counter + numImgShow)) + 'px';
        removeDotActive();
        removeImageActive(true);
        carouselImages[counter + (numImgShow * 3 - 1) / 2].classList.toggle('active');

        if (counter == -numImgShow) {
            carouselImages[carouselImages.length - (numImgShow * 3 + 1) / 2].classList.toggle('active');
        }

        if (counter < 0) {
            dots[dots.length + counter].classList.toggle('active');
        }
        if (counter >= 0) {
            dots[counter].classList.toggle('active');             //*   
        }
        scaleImage(true);

    })

    prevBtn.addEventListener('mouseenter', () => { delayRun() })
    prevBtn.addEventListener('mouseleave', () => { startRun() })
    nextBtn.addEventListener('mouseenter', () => { delayRun() })
    nextBtn.addEventListener('mouseleave', () => { startRun() })


    //Sự kiện transition end
    carouselSlide.addEventListener('transitionend', () => {        //sự kiện transitionend diễn ra khi hoàn thành transtion
        if (event.target.className == 'carousel-slide') {
            if (carouselImages[counter + numImgShow].id === 'lastClone') {
                carouselSlide.style.transition = 'none';
                counter = carouselImages.length - numImgShow * 3;                   //*
                carouselSlide.style.transform = 'translate(' + (-size * (counter + numImgShow)) + 'px';
            }
            if (carouselImages[counter + numImgShow * 2 - 1].id === 'firstClone') {
                carouselSlide.style.transition = 'none';
                counter = 0;
                carouselSlide.style.transform = 'translate(' + (-size * (counter + numImgShow)) + 'px';
            }
            finishEvent = true;
        }

    })


    //Sự kiện chuột
    carouselSlide.addEventListener('mouseover', () => {
        delayRun();
        removeImageActive(false);
    });
    carouselSlide.addEventListener('mouseleave', () => {
        startRun();
    });
    carouselDots.addEventListener('mouseover', () => {
        delayRun();
    });
    carouselDots.addEventListener('mouseleave', () => {
        startRun();
    });

    //Tạo dot và Clone auto
    function createClone(n) {
        const firstImage = carouselImages[0];
        const lastImage = carouselImages[carouselImages.length - 1];

        let firstClone;
        let lastClone;

        for (let cloneOrder = n - 1; cloneOrder >= 0; cloneOrder--) {
            firstClone = carouselImages[cloneOrder].cloneNode(true);
            if (cloneOrder == n - 1) {
                firstClone.setAttribute('id', 'firstClone')
            }
            firstClone.classList.add('clone');
            lastImage.insertAdjacentHTML('afterend', firstClone.outerHTML)
        }
        for (let cloneOrder = carouselImages.length - n; cloneOrder < carouselImages.length; cloneOrder++) {
            lastClone = carouselImages[cloneOrder].cloneNode(true);
            if (cloneOrder == carouselImages.length - n) {
                lastClone.setAttribute('id', 'lastClone')
            }
            lastClone.classList.add('clone');      //Thêm class vào đây
            firstImage.insertAdjacentHTML('beforebegin', lastClone.outerHTML)
        }

        //Cập nhật lại carouselImages
        carouselImages = document.querySelectorAll('.carousel-image');
        headTitles = document.querySelectorAll('.carousel-image h2')

    }

    function createDot(n) {
        let content = "";
        for (let i = 0; i < n; i++) { content += ` <span class="dot"></span> ` }
        carouselDots.innerHTML = content;
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', () => {
                currentSlide(i);
            })
        }
    }

    //function khởi chạy và hoãn chạy
    function delayRun() {
        clearInterval(slideRun);
    }
    function startRun() {
        if (isAuto === true) {
            const nextEvent = new Event('click');
            slideRun = setInterval(() => {
                nextBtn.dispatchEvent(nextEvent);
            }, timeDelay);
        }
    }

    //dot function
    function currentSlide(n) {
        counter = n;
        carouselSlide.style.transition = `all ${timeEffect}s ease-in-out`;
        removeDotActive();
        removeImageActive(true);
        dots[counter].classList.toggle('active');
        carouselImages[counter + (numImgShow * 3 - 1) / 2].classList.toggle('active');
        scaleImage(true);
        carouselSlide.style.transform = 'translateX(' + (-size * (counter + numImgShow)) + 'px'
    }
    function removeDotActive(bool) {
        for (let i = 0; i < carouselImages.length - numImgShow * 2; i++) {
            dots[i].classList.remove('active');
        }
        return;
    }


    //image function
    function imageClick(bool) {
        if (bool) {
            for (let i = 0; i < carouselImages.length; i++) {
                carouselImages[i].addEventListener('click', () => {
                    moveFromActive(i);
                })
            }
        }
    }
    function moveFromActive(i) {
        //Tìm giá trị cho times
        //Tìm hướng cho hàm

        times = i - findImageActive2();
        // console.log(carouselImages[findImageActive2()]);

        // console.log(findImageActive2());

        repeatFn(nextImg, times)
    }

    function findImageActive2() {
        for (let i = 0; i < carouselImages.length - 1; i++) {
            if (carouselImages[i].classList.contains('active') && i != 2) {
                return i
            }
        }
    }

    function repeatFn(fn, times) {
        let i = 0
        isNext = true;
        if (times < 0) {
            isNext = false;
            times = -times
        }
        function myLoop() {
            if (i === 0) {
                fn(isNext);
                i++;
            }
            setTimeout(() => {
                if (i < times) {
                    fn(isNext);
                    i++;
                    myLoop();
                }
            }, 500)
        }
        myLoop();
    }

    function nextImg(dir) {
        let nextEvent = new Event('click');
        if (dir) {

            nextBtn.dispatchEvent(nextEvent)
        }
        else {
            prevBtn.dispatchEvent(nextEvent)
        }
    }
















    function removeImageActive(bool) {
        if (bool) {
            for (let i = 0; i < carouselImages.length - 1; i++) {
                carouselImages[i].classList.remove("active");
            }
        }
    }

    function scaleImage(bool) {
        removeScaleImage();
        if (bool) {
            let index = findImageActive();
            index.forEach(i => {
                carouselImages[i - 1].classList.add('sub');
                carouselImages[i + 1].classList.add('sub');
            })
        }
    }

    function findImageActive() {
        let rs = [];

        for (let i = 0; i < carouselImages.length - 1; i++) {
            if (carouselImages[i].classList.contains('active')) {
                rs.push(i);
            }
        }
        return rs;

    }

    function removeScaleImage() {
        for (let i = 0; i < carouselImages.length - 1; i++) {
            carouselImages[i].classList.remove('sub');
        }
    }
    function titleMaker() {
        let ap = -5
        headTitles.forEach(h => {
            h.innerHTML = ap;
            ap++;
        })
    }

}

setTimeout(() => {
    let imgWidth = document.querySelector('.carousel-image img').offsetWidth;
    console.log(imgWidth);
    
    let imgOverlays = document.querySelectorAll('.overlay__bg');
    imgOverlays.forEach((overlay)=>{
        overlay.style.width = imgWidth+'px';
    })
}, 300);

