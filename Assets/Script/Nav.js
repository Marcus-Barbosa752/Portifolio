const SessaoHabilidades = document.getElementById('SessaoHabilidades')

const SessionIndicator = document.getElementById('SessionIndicator')

const LiHome = document.getElementById('LiHome')
const LiHabilidades = document.getElementById('LiHabilidades')
const LiPerfil = document.getElementById('LiPerfil')

let InitialIndicator = 0
let InitialWidth = 130

function OpenSession(position) {
    if (position == 0) {
        SessaoHabilidades.classList.remove('OpenSection')
        document.body.style.overflowY = "auto"
    }

    if (position == 148) {
        SessaoHabilidades.classList.add('OpenSection')
        document.body.style.overflow = "hidden"
    }
}

function setIndicatorEvents(element, position, width) {
    element.onmouseover = () => {
        SessionIndicator.style.left = `${position}px`
        SessionIndicator.style.width = `${width}px`
    }
    element.onmouseleave = () => {
        SessionIndicator.style.left = `${InitialIndicator}px`
        SessionIndicator.style.width = `${InitialWidth}px`
    }
    element.onclick = () => {
        InitialIndicator = position
        InitialWidth = width

        SessionIndicator.style.left = `${InitialIndicator}px`
        SessionIndicator.style.width = `${InitialWidth}px`
        OpenSession(position)
    }
}

setIndicatorEvents(LiHome, 0, 130)
setIndicatorEvents(LiHabilidades, 148, 118)
setIndicatorEvents(LiPerfil, 285, 66)
