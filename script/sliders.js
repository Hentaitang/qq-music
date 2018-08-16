class Slider{
    constructor(option = {}){
        this.$el = option.el
        this.slides = option.slides
        this.interval = option.interval || 3000
        this.index = 0
        this.render()
        this.start()
    }

    render(){
        this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
        this.$wrap = this.$el.firstElementChild
        this.length = this.$wrap.children.length
        this.$wrap.style.width = `${this.slides.length * 100}%`
        this.$wrap.innerHTML = this.slides.map(slide =>
            `<div class="qq-slider-item">
                <a href="${slide.link}">
                    <img src="${slide.image}">
                </a>
            </div>`
        ).join('')
    }

    start(){
        setInterval(this.next.bind(this), this.interval)
    }

    next(){
        this.index += 1
        if(this.index === this.slides.length){
            this.$wrap.style.transform = 'translateX(0)'
            this.index = 0
            return
        }
        let x = `-${this.index * 100 / this.slides.length}%`
        this.$wrap.style.transform = `translateX(${x})`
    }
}
