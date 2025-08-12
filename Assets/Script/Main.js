import { GetInfoInDataJson } from "./API.js"

// =======================
// FORMULÁRIO DE CONTATO
// =======================
\

// =======================
// ANIMAÇÕES SCROLLREVEAL
// =======================
const DOMQUERYALL = [
    document.querySelectorAll('.CardHabilidades'),
    document.querySelectorAll('.CardTemaProjetos')
]

DOMQUERYALL.forEach(nodeList => {
    nodeList.forEach((element, index) => {
        ScrollReveal().reveal(element, {
            delay: 1000 + index * 100,
            origin: 'top',
            distance: '100px'
        })
    })
})

ScrollReveal().reveal('.LeftSobre', {
    delay: 200,
    origin: 'left',
    distance: "100px"
})

ScrollReveal().reveal('.MinhaFoto', {
    delay: 200,
    origin: 'right',
    distance: "100px"
})

// =======================
// BUSCAR E RENDERIZAR PROJETOS E SLIDER
// =======================
const FetchProjetosData = async () => {
    const result = await GetInfoInDataJson(["Banner", "Projetos"])

    if (!result.status || !result.data) {
        console.error("Erro ao buscar dados.")
        return
    }

    // =======================
    // SLIDER FUNCIONAL
    // =======================
    if (result.data.Banner && result.data.Banner.length > 0) {
        const figurePrincipal = document.querySelector(".FigurePrincipal")
        const insertOthersFigures = document.getElementById("InsertOthersFiguresBanner")
        const InsetTitleNameProject = document.getElementById('InsetTitleNameProject')
        const InsertBiographyProject = document.getElementById('InsertBiographyProject')

        let bannerQueue = [...result.data.Banner]
        let sliderInterval

        function renderSlider() {
            const principalItem = bannerQueue[0]

            InsetTitleNameProject.textContent = principalItem.Titulo || "Projeto sem título"
            InsertBiographyProject.textContent = principalItem.Descricao || "Descrição não disponível"

            figurePrincipal.style.backgroundImage = `url(${principalItem.Imagem})`
            figurePrincipal.style.backgroundSize = "cover"
            figurePrincipal.style.backgroundPosition = "center"

            insertOthersFigures.innerHTML = ""
            bannerQueue.slice(1).forEach((item, index) => {
                const thumb = document.createElement("div")
                thumb.classList.add("FigureFilaBanner")
                thumb.style.backgroundImage = `url(${item.Imagem})`
                thumb.style.backgroundSize = "cover"
                thumb.style.backgroundPosition = "center"

                // Clique na miniatura
                thumb.addEventListener("click", () => {
                    animateTransition(() => {
                        const clickedIndex = index + 1
                        bannerQueue = [
                            bannerQueue[clickedIndex],
                            ...bannerQueue.slice(clickedIndex + 1),
                            ...bannerQueue.slice(0, clickedIndex)
                        ]
                        renderSlider()
                    })
                })

                insertOthersFigures.appendChild(thumb)
            })
        }

        function animateTransition(callback) {
            figurePrincipal.classList.add("fade")
            insertOthersFigures.classList.add("slide")

            setTimeout(() => {
                callback()
                figurePrincipal.classList.remove("fade")
                insertOthersFigures.classList.remove("slide")
            }, 500)
        }

        function nextSlide() {
            animateTransition(() => {
                bannerQueue.push(bannerQueue.shift())
                renderSlider()
            })
        }

        renderSlider()

        // Troca automática a cada 5 segundos
        sliderInterval = setInterval(nextSlide, 5000)

        // Pausar ao passar o mouse
        const sliderContainer = document.querySelector('.SliderContainer') || figurePrincipal.parentElement
        sliderContainer.addEventListener('mouseenter', () => clearInterval(sliderInterval))
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 5000)
        })
    }

    // =======================
    // CRIAR CARDS DE PROJETOS
    // =======================
    const ProjetosHome = document.getElementById('ProjetosHome')

    if (result.data.Projetos && result.data.Projetos.length > 0) {
        for (const projeto of result.data.Projetos) {
            const card = document.createElement("div")
            card.classList.add("CardProjetosHome")
            card.innerHTML = `
                <img src="${projeto.Image}" alt="Imagem do Projeto">
                <div class="Bottom">
                    <h4>${projeto.Nome}</h4>
                    <button>Acessar</button>
                </div>
            `
            card.querySelector("button").addEventListener("click", () => {
                window.location.href = projeto.Link
            })
            ProjetosHome.appendChild(card)
        }

        // Animação dos cards depois que foram criados
        document.querySelectorAll(".CardProjetosHome").forEach(card => {
            ScrollReveal().reveal(card, {
                delay: 200,
                origin: 'bottom',
                distance: '50px'
            })
        })
    } else {
        ProjetosHome.innerHTML = "<p>Nenhum projeto encontrado.</p>"
    }
}

FetchProjetosData()
