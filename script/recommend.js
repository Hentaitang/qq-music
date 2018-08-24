import { RECOMMEND_URL } from './constants.js'
import { lazyload } from './lazyload.js'
import { Slider } from './sliders.js'
import { swiper } from './app.js'

export class Recommend {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch(RECOMMEND_URL)
            .then(res => res.json())
            .then(json => {this.render(json)})
            .then(() => this.loading())
        return this
    }

    render(json) {
        this.renderSlider(json.data.slider)
        swiper()
        this.renderRadio(json.data.radioList)
        this.renderSong(json.data.songList)
        lazyload(this.$el.querySelectorAll('.lazyload'))
    }

    loading() {
        let load = this.$el.querySelector('#loading')
        let body = document.querySelector('#body')
        load.classList.add('hidden')
        body.classList.remove('all-load')
    }

    renderSlider(slides) {
        slides = slides.map(slide => {
            return { link: slide.linkUrl, image: slide.picUrl }
        })
        new Slider({
            el: this.$el.querySelector('#slider'),
            slides
        })
    }

    renderRadio(radios) {
        this.$el.querySelector('.radio .list').innerHTML = radios.map(radio =>
            `<div class="list-item">
            <div class="list-media">
                <img class="lazyload" src="./images/default-pic.jpg" data-src="${radio.picUrl}">
                <span class="icon icon_play"></span>
            </div>
            <div class="list-title">${radio.Ftitle}</div>
        </div>`).join('')
    }

    renderSong(songs) {
        this.$el.querySelector('.song .list').innerHTML = songs.map(song =>
            `<div class="list-item">
                <div class="list-media">
                    <img class="lazyload" src="./images/default-pic.jpg" data-src="${song.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${song.songListDesc}</div>
            </div>`).join('')
    }
}