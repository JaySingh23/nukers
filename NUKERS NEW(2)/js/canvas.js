const svg = d3.select('#hero').append('svg')

const group = svg.append('g')
    .attr('class', 'node')
    // .attr('transform', 'translate(10,10)')
    .attr('width', innerWidth)
    .attr('height', innerHeight);

const foreignObject = group.append('foreignObject')
    .attr('width', innerWidth)
    .attr('height', innerHeight);

const canvas = foreignObject.append('xhtml:canvas')
    .attr('xmlns', 'http://www.w3.org/1999/xhtml')
    .attr('class', 'anim')
    .attr('width', innerWidth)
    .attr('height', innerHeight);

const c = canvas.node().getContext('2d');

// => HTMLCanvasElement

// Draw something

class Circle {
    constructor(x, y, radius, color, blur) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.blur = blur
    }

    draw() {
        // c.beginPath()
        // c.save()
        // c.globalAlpha = 1
        // if(!this.blur) c.globalAlpha = .7
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        // c.restore()
    }

    update() {
        this.draw()
        // if(this.move)
        // this.x += 0.1
    }
}

const circle1 = new Circle(3*innerWidth / 4, innerHeight /2, 0, '#ff1a40', false)
const circle1Cover = new Circle(3*innerWidth / 4, innerHeight /2, 0, '#0c0c0c', true)

function distance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2)
}

function angleBetween(x1, y1, x2, y2) {
    return Math.atan2(y1 - y2, x1 - x2)
}



let particleArray = []

const mouse = {
    x: null,
    y: null
}

document.addEventListener('mousemove', (e) => {
    const angle1 = angleBetween(e.clientX, e.clientY, circle1.x, circle1.y)
    const dist1 = distance(e.clientX, e.clientY, circle1.x, circle1.y)

    if(dist1 - circle1.radius <= 500 && dist1 - circle1.radius >0) {
        gsap.to(circle1, {
            x: circle1.x + (12* Math.cos(angle1)),
            y: circle1.y + (12* Math.sin(angle1)),
            duration: 0.6
        })
    }
    // else {
    //     gsap.to(circle1, {
    //         x: 3*innerWidth /4,
    //         y: innerHeight /2,
    //         duration: 0.6
    //     })
    // }
    mouse.x = e.x
    mouse.y = e.y
})

setInterval(() => {
    mouse.x = undefined
    mouse.y = undefined
}, 200)

setInterval(() => {
    gsap.to(circle1, {
        x: innerWidth /2,
        y: innerHeight /2,
        duration: 0.6
    })
}, 2000)

class Particle {
    constructor(x, y, size, weight) {
        this.x = x
        this.y = y   
        this.size = size
        this.weight = weight
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0 , Math.PI *2, false)
        c.fillStyle = mouseTrail
        c.fill()
    }

    update() {
        this.size -= 0.05
        if(this.size < 0) {
            this.x = mouse.x + ((Math.random() *20) -10)
            this.y = mouse.y + ((Math.random() *20) -10)
            this.size = (Math.random() *10) +2
            this.weight = (Math.random() *2) -0.5
        }
        this.y += this.weight
        this.weight += 0.2

        if(this.y > canvas.height - this.size) {
            this.weight *= -1
        }
    }
}

const num = 100

function init() {
    particleArray = []

    for(let i = 0; i < num; i++) {
        let x = Math.random() *canvas.width
        let y = Math.random() *canvas.height
        let size = (Math.random() *5) +2
        let weight = 1
        particleArray.push(new Particle(x, y, size, weight))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = '#090b0e'
    c.fillRect(0, 0, innerWidth, innerHeight)
    circle1.update()
    circle1Cover.update()
    particleArray.forEach((particle) => {
        
        particle.update()
        particle.draw()
    })

}

init()
animate()
