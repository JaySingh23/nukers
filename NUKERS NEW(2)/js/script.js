const body = document.body
const icons = document.querySelectorAll('.wrapper .icon');
const spans = document.querySelectorAll('.head span')
const more = document.querySelector('.more')

let mouseTrail = '#54d7e4'

icons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
    });
});

more.addEventListener('mouseenter', (e) => {
    mouseTrail = '#e95499'
})
more.addEventListener('mouseleave', () => {
    mouseTrail = '#54d7e4'
})

function createCircles(e) {
    // if(Math.random() > .5) {
        const createElement = document.createElement('span')
        createElement.classList.add('circle')
        var size = Math.random() * 50;
        createElement.style.backgroundColor = mouseTrail
        gsap.to(createElement, {
            width: 2* size + 'px',
            height: 2* size + 'px',
            ease: 'ease',
            duration: '.2'
        })
        createElement.style.left = e.pageX + "px";
        createElement.style.top = e.pageY + "px";
        document.querySelector('body').appendChild(createElement);

        setTimeout(() => {
            gsap.to(createElement, {
                opacity: 0,
                ease: 'ease',
                duration: '.1'
            })
            createElement.remove()
        }, 200)
    // }
}

const MouseWheelHandler = function (e) {
    var e = window.event || e
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))

    e.preventDefault()
    e.stopPropagation()

    if (delta === -1) { contentView().then(() => scrollAnim()) }

    return false
}

if (body.addEventListener) {
    body.addEventListener("mousewheel", MouseWheelHandler, { passive: false })
    body.addEventListener("DOMMouseScroll", MouseWheelHandler, { passive: false })
}

const contentView = () => {
    return new Promise((resolve, reject) => {
        
        const tl = gsap.timeline({
            default: {duration: 1}
        })

        tl.to('#landing', {
            zIndex: '-1',
            duration: .1
        })
        .to('#about', {
            display: 'block',
            // top: '0%',
            translateY: 0,
            ease: 'power4.out',
            duration: .2
        }, '-=0.05')
        .from('#about .page', {
            top: '90%',
            ease: 'ease.in',
            duration: .6
        })
        .to('.head', {
            top: '30%',
            ease: 'ease.inOut',
            // duration: 1
        }, '-=0.4')
        .to('#landing', {
            display: 'none',
            duration: .1
        }, '-=0.6')
        .to('#work', {
            display: 'flex'
        })
        .to('.more', {
            display: 'block'
        })
        .to('#team', {
            display: 'flex'
        })
        .to('#contact', {
            display: 'block'
        })

        try {
            body.removeEventListener('mousewheel', MouseWheelHandler)
            body.removeEventListener('DOMMouseScroll', MouseWheelHandler)
        } catch {}
        

        $('body').on('mousemove', createCircles)
        resolve()
    })
}

let scrollTeam = true
let scrollMore = true
let scrollWork = true
const scrollAnim = () => {
    window.onscroll = (e) => {
        e.preventDefault()

        if(pageYOffset > 7.5*innerHeight /3 && scrollTeam) {
            scrollTeam = false
            console.log('team')
            gsap.to('.member', {
                marginTop: '0px',
                duration: 1.2
            })

        }
        else if(pageYOffset > 4*innerHeight /3 && scrollMore) {
            scrollMore = false
            console.log('more')
            gsap.to('.more', {
                scale: 1,
                ease: 'ease',
                duration: .7
            })
            return
        }
        else if(pageYOffset > innerHeight /3 && scrollWork) {
            scrollWork = false
            console.log('work')
            gsap.to('#work .page', {
                scale: 1,
                ease: 'bounce',
                opacity: '1',
                duration: .7
            })
            return
        }
    }
}

spans[0].addEventListener('mousemove', (e) => {
    $('.love').css({'top': e.offsetY -50 +'px', 'left': e.clientX -100 +'px', 'opacity': '1'})
    // $('.nuke').css('display', 'none')
}, false)
spans[0].addEventListener('mouseout', (e) => {
    $('.love').css('opacity', '0')
    // $('.nuke').css('display', 'block')
}, false)

spans[1].addEventListener('mousemove', (e) => {
    $('.work').css({'top': e.offsetY -50 +'px', 'left': e.clientX -200 +'px', 'opacity': '1'})
}, false)
spans[1].addEventListener('mouseout', (e) => {
    $('.work').css('opacity', '0')
}, false)

spans[2].addEventListener('mousemove', (e) => {
    $('.unique').css({'top': e.offsetY -50 +'px', 'left': e.clientX -200 +'px', 'opacity': '1'})
}, false)
spans[2].addEventListener('mouseout', (e) => {
    $('.unique').css('opacity', '0')
}, false)

spans[3].addEventListener('mousemove', (e) => {
    $('.idea').css({'top': e.offsetY -50 +'px', 'left': e.clientX -100 +'px', 'opacity': '1'})
}, false)
spans[3].addEventListener('mouseout', (e) => {
    $('.idea').css('opacity', '0')
}, false)

//parallax effects 

var scene1 = document.getElementById('scene1');
var parallaxInstance = new Parallax(scene1);

var scene2 = document.getElementById('scene2');
var parallaxInstance = new Parallax(scene2);

var scene4 = document.getElementById('scene4');
var parallaxInstance = new Parallax(scene4);

var scene5 = document.getElementById('scene5');
var parallaxInstance = new Parallax(scene5);

const tilt = $('.js-tilt').tilt();

//hoverEffect 



