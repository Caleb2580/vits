
let navSliding = false;

function slideNav() {
    if (!navSliding) {
        let nav = document.querySelector('.nav #left');
        if (nav != null) {
            navSliding = true;
            
            let curMargin = window.getComputedStyle(nav).marginLeft;
            curMargin = parseFloat(curMargin.substring(0, curMargin.length-2));
            console.log(curMargin)
            let button = document.querySelector('.nav_drag');
            let right = document.querySelector('#right');
            if (curMargin === 0) {
                nav.style.marginLeft = '-100%';
                button.style.right = 'calc(100% - 2em)';
                right.style.left = '15%';
                // setTimeout(() => {
                //     button.innerHTML = '>';
                // }, 200);
            } else {
                nav.style.marginLeft = '0px';
                button.style.right = '1em';
                right.style.left = '100%';
                // setTimeout(() => {
                //     button.innerHTML = '<';
                // }, 200);
            }
            
            setTimeout(() => {
                navSliding = false;
            }, 200);
        }
    }
}

function scrollToPage(location) {
    if (window.location.pathname != '/') {
        window.location.href = '/';
    }
    switch(location) {
        case 'Home':
            scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
            break;
        case 'About':
            document.querySelector('.mini_page_container').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
            break;
        case 'Services':
            const services = document.querySelector('.page_full');
            const y = services.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(services).paddingTop.replace('px', ''));
            scrollTo({
                behavior: 'smooth',
                top: y,
                left: 0,
            })
            break;
        case 'Contact Us':
            document.querySelector('.talk_page').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
            break;
    }
}



