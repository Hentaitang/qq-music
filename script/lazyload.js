export function lazyload(image) {
    let imgs = [].slice.call(image) // Array.from(images)
    console.log(typeof(image))

    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    loadImage(entry.target, () => {
                        observer.unobserve(entry.target)
                    })
                }
            })
        }, { threshold: 0.01 })

        imgs.forEach(img => observer.observe(img))
    } else {
        let onscroll = throttle(function () {
            if (imgs.length === 0) {
                return window.removeEventListener('scroll', onscroll)
            }
            imgs = imgs.filter(img => img.classList.contains('lazyload'))
            imgs.forEach(img => {
                if (inViewport(img)) {
                    loadImage(img)
                }
            })
        }, 500)

        window.addEventListener('scroll', onscroll)
        window.dispatchEvent(new Event('scroll'))
    }

    
    function throttle(func, wait){
        let prev, timer
        return function fn(){
            let curr = Date.now()
            let diff = curr - prev
            if(!prev || diff >= wait){
                func()
                prev = curr
            }else if(diff < wait){
                clearTimeout(timer)
                timer = setTimeout(fn, wait - diff)
            }
        }
    }

    function inViewport(img){
        let { top, left, right, bottom } = img.getBoundingClientRect()
        let vpHeight = document.documentElement.clientHeight
        let vpWidth = document.documentElement.clientWidth
        return (
        (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
        (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }

    function loadImage(img, callback) {
        let image = new Image()
        image.src = img.dataset.src
        image.onload = function () {
            img.src = image.src
            img.classList.remove('lazyload')
        }
        if (typeof callback === 'function') callback()
    }
}