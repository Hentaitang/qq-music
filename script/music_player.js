import { LyricsPlayer } from './lyrics_player.js'
import { ProgressBar } from './progress_bar.js'

export class MusicPlayer {
    constructor(el) {
        this.$el = el
        this.$el.addEventListener('click', this)
        this.createAudio()
        this.lyrics = new LyricsPlayer(document.querySelector('.player-lyrics'), this.$audio)
        this.progress = new ProgressBar(document.querySelector('.progress'))
    }

    createAudio() {
        this.$audio = document.createElement('audio')
        // this.$audio.loop = true
        this.$audio.id = `player-${Math.floor(Math.random() * 100)}`
        this.$audio.addEventListener('ended', ()=>{
            this.lyrics.reset()
            this.progress.reset()
            let playButton = document.querySelector('.icon-pause')
            if(playButton){
                playButton.classList.add('icon-play')
                playButton.classList.remove('icon-pause')
            }
        })
        body.appendChild(this.$audio)
    }

    handleEvent(event) {
        let target = event.target
        switch (true) {
            case target.matches('.icon-play'):
                this.onPlay(target)
                break
            case target.matches('.icon-pause'):
                this.onPause(target)
                break
            case target.matches('#icon-list'):
                this.hide(target)
                break
            case target.matches('#button'):
                this.hide(target.parentNode)
                break
        }
    }

    onPause(target) {
        this.$audio.pause()
        this.progress.pause()
        this.lyrics.pause()
        target.classList.add('icon-play')
        target.classList.remove('icon-pause')
    }

    onPlay(target) {
        this.$audio.play()
        this.progress.start()
        this.lyrics.start()
        target.classList.add('icon-pause')
        target.classList.remove('icon-play')
    }

    hide(target) {
        target.parentNode.parentNode.classList.remove('show')
        let body = document.querySelector('#body')
        body.classList.remove('all-load')
    }

    play(options = {}) {
        if (!options) return
        this.$el.querySelector('.album-image').src = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg`
        this.$el.querySelector('.background-image').style.backgroundImage = `url("https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg")`
        this.$el.querySelector('.song-name').innerText = `${options.songname}`
        this.$el.querySelector('.song-artist').innerText = `${options.singer}`
        this.progress.reset(options.duration)
        let playButton = document.querySelector('.icon-pause')
        if(playButton){
            playButton.classList.add('icon-play')
            playButton.classList.remove('icon-pause')
        }

        if (options.songid) {
            this.$audio.src = `http://ws.stream.qqmusic.qq.com/C100${options.songmid}.m4a?fromtag=0&guid=126548448`
            fetch(`https://qq-music-api.now.sh/lyrics?id=${options.songid}}`)
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text => this.lyrics.reset(text))
                .catch(() => { })
        }
        this.show()
    }

    show() {
        this.$el.classList.add('show')
        let body = document.querySelector('#body')
        body.classList.add('all-load')
    }
}