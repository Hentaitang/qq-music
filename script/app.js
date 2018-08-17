!function () {

    fetch('https://qq-music-api.now.sh')
        .then(res => res.json())
        .then(render)
        .then(loading)

    fetch('./json/rank.json')
        .then(res => res.json())
        .then(json => json.data.topList)
        .then(renderTopList)

    function loading(){
        let load = document.querySelector('#loading')
        let body = document.querySelector('#body')
        load.classList.add('hide')
        body.classList.remove('all-load')
    }
    function render(json) {
        renderSlider(json.data.slider)
        let swiper = new Swiper('.swiper-container', {
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
        });
        renderRadio(json.data.radioList)
        renderSong(json.data.songList)
        lazyload(document.querySelectorAll('.lazyload'))
    }

    let search = new Search(document.querySelector('.search-view'))

    function renderSlider(slides) {
        slides = slides.map(slide => {
            return { link: slide.linkUrl, image: slide.picUrl }
        })

        new Slider({
            el: document.querySelector('#slider'),
            slides
        })
    }

    function renderRadio(radios) {
        document.querySelector('.radio .list').innerHTML = radios.map(radio =>
            `<div class="list-item">
            <div class="list-media">
                <img class="lazyload" src="./images/default-pic.jpg" data-src="${radio.picUrl}">
                <span class="icon icon_play"></span>
            </div>
            <div class="list-title">${radio.Ftitle}</div>
        </div>`).join('')
    }

    function renderSong(songs) {
        document.querySelector('.song .list').innerHTML = songs.map(song =>
            `<div class="list-item">
                <div class="list-media">
                    <img class="lazyload" src="./images/default-pic.jpg" data-src="${song.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${song.songListDesc}</div>
            </div>`).join('')
    }

    function renderTopList(list) {
        document.querySelector('.topList').innerHTML = list.map(item =>
            `
                <li class="list-item">
                    <div class="list-media">
                        <a href="#">
                            <img data-src="${item.picUrl}" class="lazyload">
                        </a>
                    </div>
                    <div class="list-title">
                        <div class="title">
                            <h3>${item.topTitle}</h3>
                            <p>1
                                <span>${item.songList[0].songname}</span>-${item.songList[0].singername}</p>
                            <p>2
                                <span>${item.songList[1].songname}</span>-${item.songList[1].singername}</p>
                            <p>3
                                <span>${item.songList[2].songname}</span>-${item.songList[2].singername}</p>
                        </div>
                    </div>
                </li>`).join('')
        lazyload(document.querySelectorAll('.lazyload'))
    }
}.call()