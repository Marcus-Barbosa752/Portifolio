'use strict'

// ====== Elements ======
const SessaoHabilidades = document.getElementById('SessaoHabilidades')
const SessaoPerfil = document.getElementById('SessaoPerfil')
const SessaoServico = document.getElementById('SessaoServico')

const SessionIndicator = document.getElementById('SessionIndicator')
const IndicatorSessionMobile = document.getElementById('IndicatorSessionMobile')

const LiHome = document.getElementById('LiHome')
const LiHabilidades = document.getElementById('LiHabilidades')
const LiPerfil = document.getElementById('LiPerfil')

const BtnMenu = document.getElementById('BtnMenu')
const BtnServicos = document.getElementById('BtnServicos')

const SpanOpenMenuDois = document.getElementById('SpanOpenMenuDois')
const SpanOpenMenuUm = document.getElementById('SpanOpenMenuUm')

// Mobile menu buttons
const BtnPaginaInicialMobile = document.getElementById('BtnPaginaInicialMobile')
const BtnHablilidadesMobile = document.getElementById('BtnHablilidadesMobile')
const BtnPerfilMobile = document.getElementById('BtnPerfilMobile')
const BtnOpenServicosMobile = document.getElementById('BtnOpenServicosMobile')
const MenuFloatMobile = document.getElementById('MenuFloatMobile')

// ====== Menu map (posições e larguras / top para mobile) ======
const MENU = {
    home: { left: 0, width: 130, top: 45, section: 'home' },
    habilidades: { left: 148, width: 118, top: 100, section: 'habilidades' },
    perfil: { left: 285, width: 66, top: 153, section: 'perfil' }
}

// ====== Estado do indicador ======
let currentIndicator = { left: MENU.home.left, width: MENU.home.width, top: MENU.home.top }
let serviceOpen = false

// ====== Função de animação ======
function animateIndicator(indicator, props) {
    if (!indicator) return

    Object.keys(props).forEach(key => {
        indicator.style[key] = props[key]
    })
}

// ====== Alterna sessões ======
function toggleSection(key) {
    SessaoPerfil.classList.remove('OpenSection')
    SessaoHabilidades.classList.remove('OpenSection')
    SessaoServico.classList.remove('OpenSection')

    serviceOpen = false
    document.body.style.overflow = 'hidden'

    switch (key) {
        case 'habilidades':
            SessaoHabilidades.classList.add('OpenSection')
            break

        case 'perfil':
            SessaoPerfil.classList.add('OpenSection')
            break

        case 'servicos':
            SessaoServico.classList.add('OpenSection')
            serviceOpen = true

            animateIndicator(SessionIndicator, { width: '0px' })
            animateIndicator(IndicatorSessionMobile, { top: `${currentIndicator.top}px`, height: '1px' })
            return

        case 'home':
        default:
            document.body.style.overflowY = 'auto'
            break
    }

    // Atualiza indicadores desktop + mobile
    animateIndicator(SessionIndicator, {
        left: `${currentIndicator.left}px`,
        width: `${currentIndicator.width}px`
    })

    animateIndicator(IndicatorSessionMobile, {
        top: `${currentIndicator.top}px`,
        height: '1px'
    })
}

// ====== Configura eventos do indicador (desktop + mobile) ======
function setIndicatorEvents(element, key) {
    if (!element || !MENU[key]) return
    const { left, width, top } = MENU[key]

    element.addEventListener('mouseover', () => {
        if (serviceOpen) return

        animateIndicator(SessionIndicator, { left: `${left}px`, width: `${width}px` })
        animateIndicator(IndicatorSessionMobile, { top: `${top}px`, height: '1px' })
    })

    element.addEventListener('mouseleave', () => {
        if (serviceOpen) return

        animateIndicator(SessionIndicator, { left: `${currentIndicator.left}px`, width: `${currentIndicator.width}px` })
        animateIndicator(IndicatorSessionMobile, { top: `${currentIndicator.top}px`, height: '1px' })
    })

    element.addEventListener('click', () => {
        currentIndicator = { left, width, top }
        toggleSection(key)
    })
}

// Bind desktop
setIndicatorEvents(LiHome, 'home')
setIndicatorEvents(LiHabilidades, 'habilidades')
setIndicatorEvents(LiPerfil, 'perfil')

// Botão Serviços
BtnServicos?.addEventListener('click', () => toggleSection('servicos'))
BtnOpenServicosMobile?.addEventListener('click', () => {
    IndicatorSessionMobile.style.width = '0'
    toggleSection('servicos')
})

// Bind mobile (usa top)
setIndicatorEvents(BtnPaginaInicialMobile, 'home')
setIndicatorEvents(BtnHablilidadesMobile, 'habilidades')
setIndicatorEvents(BtnPerfilMobile, 'perfil')

// Restaurar estilo do indicador quando clicar nos botões mobile
[BtnPaginaInicialMobile, BtnHablilidadesMobile, BtnPerfilMobile].forEach(btn => {
    btn?.addEventListener('click', () => {
        IndicatorSessionMobile.style.height = '1px'
        IndicatorSessionMobile.style.width = '100px'
    })
})

// Menu mobile
BtnMenu?.addEventListener('click', () => {
    BtnMenu.style.transition = '.4s ease-in-out'
    SpanOpenMenuDois && (SpanOpenMenuDois.style.transition = '.4s ease-in-out')
    SpanOpenMenuUm && (SpanOpenMenuUm.style.transition = '.4s ease-in-out')

    MenuFloatMobile?.classList.toggle('MenuFloatMobileActivate')

    BtnMenu.classList.toggle('Activate')
    SpanOpenMenuDois?.classList.toggle('ActivateSpanUmMenuMobile')
    SpanOpenMenuUm?.classList.toggle('ActivateSpanDoisMenuMobile')
})

// Inicializa indicadores
animateIndicator(SessionIndicator, {
    left: `${currentIndicator.left}px`,
    width: `${currentIndicator.width}px`
})

animateIndicator(IndicatorSessionMobile, {
    top: `${currentIndicator.top}px`,
    height: '1px'
})

document.body.style.overflowY = 'auto'

// ====== Animação do IndicatorSessionMobile (mobile) ======
function PositionIndicatorSessionMobile(Button, Indicator, TopIndicator) {
    Button.onclick = () => {
        setTimeout(() => Indicator.style.width = '0', 0)
        setTimeout(() => Indicator.style.top = `${TopIndicator}px`, 500)
        setTimeout(() => Indicator.style.width = '100px', 1200)

        OpenSeesionMobile(TopIndicator)
    }
}

// Aplica a animação aos botões mobile
PositionIndicatorSessionMobile(BtnPaginaInicialMobile, IndicatorSessionMobile, 45)
PositionIndicatorSessionMobile(BtnHablilidadesMobile, IndicatorSessionMobile, 100)
PositionIndicatorSessionMobile(BtnPerfilMobile, IndicatorSessionMobile, 153)
