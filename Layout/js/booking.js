setTimeout(()=>{
    const container = document.querySelector('.container');

        //Update total and count


        //Movie Select Event

        //Seat click event
        container.addEventListener('click', e => {
            if (e.target.classList.contains('seat') &&
                !e.target.classList.contains('occupied')) {
                e.target.classList.toggle('selected');
            }
        });    
}, 200)