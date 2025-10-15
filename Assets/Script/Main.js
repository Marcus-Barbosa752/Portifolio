import { GetInfoInDataJson } from "./API.js"

// =======================
// ENVIAR DADOS DO FORMULÁRIO PARA WHATSAPP 
// =======================
const BtnEnviarFormContato = document.getElementById('BtnEnviarFormContato')

const InputNomeFormContato = document.getElementById("InputNomeFormContato")
const InputEmailOrTelefoneContato = document.getElementById("InputEmailOrTelefoneContato")
const InputMensagemFormContato = document.getElementById("InputMensagemFormContato")
const StatusFormContato = document.getElementById('StatusFormContato')

const REGEXEMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const REGEXTELEFONE = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}-?\d{4}|\d{4}-?\d{4})$/
let Url = ''

const VerificarCampo = (Campo) => {
    if (!Campo.value.trim()) {
        Campo.style.background = 'red'
        Campo.onclick = () => Campo.style.background = 'black'
        return false
    }

    if (Campo === InputEmailOrTelefoneContato) {
        if (!(REGEXEMAIL.test(Campo.value) || REGEXTELEFONE.test(Campo.value))) {
            alert("Digite um e-mail ou telefone válido!")
            return false
        }
    }

    return true
}

BtnEnviarFormContato.onclick = (e) => {
    e.preventDefault()

    try {
        if (!VerificarCampo(InputNomeFormContato) || 
            !VerificarCampo(InputEmailOrTelefoneContato) || 
            !VerificarCampo(InputMensagemFormContato)) {
            alert("Preencha todos os campos corretamente!")
            return
        }
    
        const SeuTexto = `
            Nome: ${InputNomeFormContato.value}
            Email/Telefone: ${InputEmailOrTelefoneContato.value}
            Texto:
            ${InputMensagemFormContato.value}
        `
    
        Url = `https://wa.me/5571991778968?text=${encodeURIComponent(SeuTexto)}`
        open(Url)

    }catch (e) {
        console.log("Não foi possivel enviar seu formulario!")
        StatusFormContato.textContent = 'Não foi possivel enviar seu formulario!'
        setTimeout(StatusFormContato.textContent = '', 5000)
    }
}

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
    const result = await GetInfoInDataJson(["Banner", "Projetos", "Python", "Servicos"])

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
                    <nav>
                        <button>Acessar</button>
                        <button>Sobre</button>
                    </nav>
                </div>
            `
            card.querySelector("button").addEventListener("click", () => {
                open(projeto.Link, "__blank")
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

    // =======================
    // SESSÃO DE HABILIDADES
    // =======================
    const InsertProjetosHabilidades = document.getElementById("InsertProjetosHabilidades")

    if (!InsertProjetosHabilidades) {
        console.warn("Elemento com id='InsertProjetosHabilidades' não encontrado no DOM. Cards Python não serão renderizados.")
        return
    }

    if (result.data.Python && result.data.Python.length > 0) {
        for (const projeto of result.data.Python) {
            const card = document.createElement("div")
            card.classList.add("CardProjetosHabilidades")

            card.innerHTML = `
                <div class="CardProjetosHabilidades">
                    <img src="${projeto.Image}" alt="Foto de projeto python">
        
                    <div class="Bottom">
                        <h4>${projeto.Titulo}</h4>
                        <button>Acessar</button>
                    </div>
                </div>
            `
            card.querySelector("button").addEventListener("click", () => {
                window.location.href = projeto.Link
            })

            InsertProjetosHabilidades.appendChild(card)
        }

        document.querySelectorAll(".CardProjetosHabilidades").forEach(card => {
            ScrollReveal().reveal(card, {
                delay: 200,
                origin: 'left',
                distance: '50px'
            })
        })
    } else {
        console.log("Nenhum projeto de python encontrado!")
    }

    // =======================
    // SESSÃO DE SERVIÇOS
    // =======================
    const InsertCardWebDesignPrototipagem = document.getElementById('InsertCardWebDesignPrototipagem')
    const InsertCardSistemas = document.getElementById('InsertCardSistemas')

    if (result.data.Servicos && result.data.Servicos.length > 0) {
        console.log(result.data.Servicos)
    
        // Filtrar por categoria (essa info pode ser adicionada no API.js)
        const webDesign = result.data.Servicos.filter(servico =>
            ["WebdesignAndPrototipagem"].includes(servico.Categoria)
        )
        const sistemas = result.data.Servicos.filter(servico =>
            ["Sistemas"].includes(servico.Categoria)
        )
    
        // Função para criar cards
        const createCard = (projeto) => {
            const card = document.createElement("div")
            card.classList.add("CardProjetosHabilidades")
    
            card.innerHTML = `
                <div class="CardServico">
                    <h4>${projeto.Titulo}</h4>
                    <img src="${projeto.Capa}" alt="Imagem do serviço">
                    <p>${projeto.Sobre}</p>
                    <button>Contratar esse serviço</button>
                </div>
            `
            card.querySelector("button").addEventListener("click", () => {
                window.location.href = projeto.Link
            })
    
            return card
        }
    
        // Webdesign
        webDesign.forEach(servico => InsertCardWebDesignPrototipagem.appendChild(createCard(servico)))
    
        // Sistemas
        sistemas.forEach(servico => InsertCardSistemas.appendChild(createCard(servico)))
    }
}

FetchProjetosData()

// =======================
// VISUALIZAR O PORTIFOLIO
// =======================
const BtnVisualizarCurriculo = document.getElementById('BtnVisualizarCurriculo')
const BtnFecharPortifolioMobile = document.getElementById("BtnFecharPortifolioMobile")
const IframeCurriculoPage = document.getElementById("IframeCurriculoPage")

BtnVisualizarCurriculo.onclick = () => {
    if (BtnVisualizarCurriculo.innerHTML == '<i class="fi fi-sc-overview" id="ItagMobile"></i>Visualizar') {
        BtnVisualizarCurriculo.innerHTML = '<i class="fi fi-sc-overview" id="ItagMobile"></i>Fechar'
    }else {
        BtnVisualizarCurriculo.innerHTML = '<i class="fi fi-sc-overview" id="ItagMobile"></i>Visualizar'
    }

    if (innerWidth <= 900) {
        BtnFecharPortifolioMobile.style.display = 'block'
    }

    IframeCurriculoPage.classList.toggle("IframeCurriculoPageActive")

    BtnFecharPortifolioMobile.onclick = () => {
        BtnFecharPortifolioMobile.style.display = 'none'
        IframeCurriculoPage.classList.toggle("IframeCurriculoPageActive")
        BtnVisualizarCurriculo.innerHTML = '<i class="fi fi-sc-overview" id="ItagMobile"></i>Visualizar'
    }
}
