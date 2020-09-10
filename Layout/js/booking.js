setTimeout(() => {
    const container = document.querySelector('.booking__right-seating');

    //Update total and count


    //Movie Select Event

    //Seat click event
    container.addEventListener('click', e => {
        if (e.target.classList.contains('seat') &&
            !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
        }
    });
    const makeNavLInksSmooth = () => {
        let navLinks = document.querySelectorAll('.navbar__link')
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(link.hash).scrollIntoView({
                    behavior: "smooth"
                })
            })
        });
    }

    //for scrollspy - change the active link as we scroll

    const spyScrolling = () => {
        const sections = document.querySelectorAll('.main__content');
        window.onscroll = () => {
            const scrollPosition = document.documentElement.scrollTop + 300 || document.body.scrollTop;

            for (let s in sections) {
                if (sections.hasOwnProperty(s) && (sections[s].offsetTop) <= scrollPosition) {
                    const id = sections[s].id;
                    if (document.querySelector('.navbar__link--active') != null) {
                        document.querySelector('.navbar__link--active').classList.remove('navbar__link--active');

                    }
                    document.querySelector(`a[href*=${id}]`).parentNode.classList.add('navbar__link--active')
                }
            }
        }

    }
    makeNavLInksSmooth();
    spyScrolling();
}, 300)