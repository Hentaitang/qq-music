class Search{
    constructor(el) {
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.$input.addEventListener('click', this.onclick.bind(this))
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

    onScroll(event){
        if(this.nomore) return
        if(document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight -50){
            this.search(this.keyword, this.page + 1)
        }
        
    }

    onclick(event){
        console.log(event)
    }

    onKeyUp(event){
        let keyword = event.target.value
        console.log(keyword)
        if(!keyword) return this.reset()
        if(event.key !== 'Enter') return
        this.search(keyword)
    }

    reset(){
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
    }

    search(keyword, page){
        if(this.fetching) return
        this.fetching = true
        this.keyword = keyword
        fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${page ||this.page}`)
        .then(res => res.json())
        .then(json => {
            this.page = json.data.song.curpage
            this.nomore = (json.message === 'no result')
            this.songs.push(...json.data.song.list)
            return json.data.song.list
        })
        .then(songs => this.append(songs))
        .then(()=>{this.fetching = false})
    }

    append(songs){
        let html = songs.map(song => `
            <li class="song-item">
                <div class="icon-image"><img src="./images/search-sprite.png"></div>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join('')}</div>
            </li>`).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }
}