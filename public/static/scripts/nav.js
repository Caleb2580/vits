
let navSliding = false;

function slideNav() {
    if (!navSliding) {
        let nav = document.querySelector('.nav');
        if (nav != null) {
            navSliding = true;
            
            let curMargin = window.getComputedStyle(nav).marginLeft;
            let button = document.querySelector('.nav_drag');
            let right = document.querySelector('#right');
            if (curMargin === '0px') {
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




