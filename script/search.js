class Search {
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
        if (event.key !== 'Enter') return
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
        fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')
                this.songs.push(...json.data.song.list)
                return json.data
            })
            .then(songs => this.append(songs))
            .then(()=>{
                if(this.nomore){
                    let end = '<p>已加载全部</p>'
                    this.$songs.insertAdjacentHTML('beforeend', end)
                }
            })
            .then(() => { this.fetching = false })
    }

    append(songs) {
        if(songs.zhida.songnum){
            let header = `
            <li class="song-item">
                <div class="artist-image"><img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${songs.zhida.singermid}.jpg?max_age=2592000"></div>
                <div class="song-name ellipsis">${songs.zhida.singername}</div>
                <div class="song-artist ellipsis"><span>单曲：${songs.zhida.songnum}</span><span>专辑：${songs.zhida.albumnum}</span></div>
            </li>`
            this.$songs.insertAdjacentHTML('beforeend', header)
        }
        
        let html = songs.song.list.map(song => `
            <li class="song-item">
                <div class="icon-image"><img src="./images/search-sprite.png"></div>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' / ')}</div>
            </li>`).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)

        
        
    }
}