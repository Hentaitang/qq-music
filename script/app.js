import './tab.js'
import { Recommend } from './recommend.js'
import { Search } from './search.js'
import { MusicPlayer} from './music_player.js'
import { TopList } from './toplist.js'

let recommend = new Recommend(document.querySelector('#rec-view')).launch()
let toplist = new TopList(document.querySelector('#rank-view')).launch()
let search = new Search(document.querySelector('.search-view'))
let Musicplayer = new MusicPlayer(document.querySelector('#music-player'))
let button = document.querySelector('#play-button')
button.addEventListener('click', () => { Musicplayer.show() })

onHashChange()
window.addEventListener('hashchange', onHashChange)

function onHashChange() {
    if (/^#player\?.+/.test(location.hash)) {
        let index = location.hash.indexOf('?') + 1
        let hash = decodeURIComponent(location.hash).slice(index)
        let matches = hash.match(/(\w+)=([^&]+)/g)
        // let options = matches && matches.reduce((res, cur)=>{
        //     let arr = cur.split('=')
        //     res[arr[0]] = arr[1]
        //     return res
        // }, {})
        let options = matches.reduce((res, cur) => {
            let arr = cur.split('=')
            res[arr[0]] = arr[1]
            return res
        }, {})
        Musicplayer.play(options)
    }
}

export function swiper() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
}