import { TOPLIST_URL } from './constants.js'
import { lazyload } from './lazyload.js'

export class TopList {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch(TOPLIST_URL)
            .then(res => res.json())
            .then(json => this.renderTopList(json.data.topList))
        return this
    }

    renderTopList(list) {
        this.$el.querySelector('.topList').innerHTML = list.map(item =>
            `<li class="list-item">
                <div class="list-media">
                    <a href="#">
                        <img data-src="${item.picUrl}" class="lazyload">
                    </a>
                </div>
                <div class="list-title">
                    <div class="title">
                        <h3>${item.topTitle}</h3>
                        <p>1<span>${item.songList[0].songname}</span>-${item.songList[0].singername}</p>
                        <p>2<span>${item.songList[1].songname}</span>-${item.songList[1].singername}</p>
                        <p>3<span>${item.songList[2].songname}</span>-${item.songList[2].singername}</p>
                    </div>
                </div>
            </li>`).join('')
        lazyload(this.$el.querySelectorAll('.lazyload'))
    }
}



