const SessaoHabilidades = document.getElementById('SessaoHabilidades')
const SessaoPerfil = document.getElementById("SessaoPerfil")

const SessionIndicator = document.getElementById('SessionIndicator')

const LiHome = document.getElementById('LiHome')
const LiHabilidades = document.getElementById('LiHabilidades')
const LiPerfil = document.getElementById('LiPerfil')

const BtnMenu = document.getElementById("BtnMenu")

const SpanOpenMenuDois = document.getElementById("SpanOpenMenuDois")
const SpanOpenMenuUm = document.getElementById("SpanOpenMenuUm")

let InitialIndicator = 0
let InitialWidth = 130

function OpenSession(position) {
    document.body.style.overflow = "hidden"

    if (position == 0) { // Pagina inicial
        SessaoPerfil.classList.remove('OpenSection')
        SessaoHabilidades.classList.remove('OpenSection')
        document.body.style.overflowY = "auto"
    }

    if (position == 148) { // Habilidades
        SessaoHabilidades.classList.add('OpenSection')
        SessaoPerfil.classList.remove('OpenSection')
    }

    if (position == 285) { // Perfil
        SessaoHabilidades.classList.remove('OpenSection')
        SessaoPerfil.classList.add('OpenSection')
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

// Mobile
const IndicatorSessionMobile = document.getElementById('IndicatorSessionMobile')

const BtnPaginaInicialMobile = document.getElementById('BtnPaginaInicialMobile')
const BtnHablilidadesMobile = document.getElementById('BtnHablilidadesMobile')
const BtnPerfilMobile = document.getElementById('BtnPerfilMobile')

const MenuFloatMobile = document.getElementById('MenuFloatMobile')

function OpenSeesionMobile(position) {
    document.body.style.overflow = "hidden"

    if (position == 45) { // Pagina inicial
        SessaoPerfil.classList.remove('OpenSection')
        SessaoHabilidades.classList.remove('OpenSection')
        document.body.style.overflowY = "auto"
    }

    if (position == 100) { // Habilidades
        SessaoHabilidades.classList.add('OpenSection')
        SessaoPerfil.classList.remove('OpenSection')
    }

    if (position == 153) { // Perfil
        SessaoHabilidades.classList.remove('OpenSection')
        SessaoPerfil.classList.add('OpenSection')
    }
}

function PositionIndicatorSessionMobile(Button, Indicator, TopIndicator) {
    Button.onclick = () => {
        setTimeout(() => Indicator.style.width = '0', 0)
        setTimeout(() => Indicator.style.top = `${TopIndicator}px`, 500)
        setTimeout(() => Indicator.style.width = '100px', 1200)

        OpenSeesionMobile(TopIndicator)
    }
}

PositionIndicatorSessionMobile(BtnPaginaInicialMobile, IndicatorSessionMobile, 45)
PositionIndicatorSessionMobile(BtnHablilidadesMobile, IndicatorSessionMobile, 100)
PositionIndicatorSessionMobile(BtnPerfilMobile, IndicatorSessionMobile, 153)

BtnMenu.onclick = () => {
    BtnMenu.style.transition = '.4s ease-in-out'
    SpanOpenMenuDois.style.transition = '.4s ease-in-out'
    SpanOpenMenuUm.style.transition = '.4s ease-in-out'

    MenuFloatMobile.classList.toggle('MenuFloatMobileActivate')

    BtnMenu.classList.toggle('Activate')
    SpanOpenMenuDois.classList.toggle('ActivateSpanUmMenuMobile')
    SpanOpenMenuUm.classList.toggle('ActivateSpanDoisMenuMobile')
}
