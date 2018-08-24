export class Slider {
    constructor(option = {}) {
        this.$el = option.el
        this.slides = option.slides
        this.render()

    }

    render() {
        this.$el.innerHTML = `
        <div class="qq-slider-wrap">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        `
        this.$wrap = this.$el.querySelector('.swiper-wrapper')
        this.$wrap.innerHTML = this.slides.map(slide => 
            `<div class="swiper-slide">
                <div class="qq-slider-item">
                    <a href="${slide.link}">
                        <img src="${slide.image}">
                    </a>
                </div>
            </div>
            `
        ).join('')
        
    }
}
