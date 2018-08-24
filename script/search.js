export class Search {
    constructor(el) {
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.$input.addEventListener('input', this.oninput.bind(this))
        this.keyword = ''
        this.$songs = document.querySelector('#song-list')
        this.page = 1
        this.songs = []
        this.nomore = false
        this.perpage = 20
        this.fetching = false
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll', this.onscroll)
    }


    

    onScroll(event) {
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }

    oninput(event) {
        if (!event.target.value) {
            return this.reset()
        }
    }

    onKeyUp(event) {
        let keyword = event.target.value
        if (event.keyCode !== 13) return
        this.search(keyword)
    }

    reset() {
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
    }

    search(keyword, page) {
        if (this.fetching) return
        this.fetching = true
        this.keyword = keyword
        let searching = '<div class="searching"><img src="./images/icon_loading.png"><span>正在加载更多...</span></div>'
        this.$songs.insertAdjacentHTML('beforeend', searching)
        fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')
                this.songs.push(...json.data.song.list)
                return json.data
            })
            .then(songs => this.append(songs))
            .then(() => { this.fetching = false })
    }

    append(songs) {
        if(songs.zhida.songnum){
            let header = `
            <a class="song-item" href="#">
                <div class="artist-image"><img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${songs.zhida.singermid}.jpg?max_age=2592000"></div>
                <div class="song-name ellipsis">${songs.zhida.singername}</div>
                <div class="song-artist ellipsis"><span>单曲：${songs.zhida.songnum}</span><span>专辑：${songs.zhida.albumnum}</span></div>
            </a>`
            this.$songs.insertAdjacentHTML('beforeend', header)
        }
        
        let html = songs.song.list.map(song => `
            <a class="song-item" 
            href="#player?singer=${song.singer.map(s => s.name).join(' / ')}&albummid=${song.albummid}&songname=${song.songname}&songid=${song.songid}&duration=${song.interval}&songmid=${song.songmid}">
                <div class="icon-image"><img src="./images/search-sprite.png"></div>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' / ')}</div>
            </a>`).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)  

        if(this.nomore){
            let end = '<p>已加载全部</p>'
            this.$songs.insertAdjacentHTML('beforeend', end)
        }
        
        this.$songs.querySelector('.searching').classList.add('hide')
        this.$songs.querySelector('.searching.hide').style.display = 'none'
        this.$songs.querySelector('.searching.hide').classList.remove('searching')
    }
}