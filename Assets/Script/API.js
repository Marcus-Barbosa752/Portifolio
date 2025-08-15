// Função para validar dados de uma chave no JSON
const validateDataKey = (data, key, requiredFields) => {
    for (const obj of data) {
        if (obj[key]) {
            const value = obj[key]

            // Caso seja objeto com subarrays (ex: Servicos)
            if (typeof value === "object" && !Array.isArray(value)) {
                for (const subArray of Object.values(value)) {
                    if (!Array.isArray(subArray)) continue
                    for (const element of subArray) {
                        for (const field of requiredFields) {
                            if (!(field in element) || element[field] === "" || element[field] === null) {
                                console.warn(`Item em "${key}" sem o campo obrigatório "${field}":`, element)
                                return false
                            }
                        }
                    }
                }
            }

            // Caso seja array direto
            else if (Array.isArray(value)) {
                for (const element of value) {
                    for (const field of requiredFields) {
                        if (!(field in element) || element[field] === "" || element[field] === null) {
                            console.warn(`Item em "${key}" sem o campo obrigatório "${field}":`, element)
                            return false
                        }
                    }
                }
            }
        }
    }
    return true
}

// Função principal para buscar e validar (aceita uma string ou array de chaves)
const GetInfoInDataJson = async (keys) => {
    try {
        const response = await fetch('Assets/Public/Dados.json')

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()

        // Regras de validação (chave → campos obrigatórios)
        const validationRules = {
            Banner: ['Titulo', 'Descricao', 'Acesso', 'Imagem'],
            Projetos: ['Nome', 'Image', 'Descricao', 'Link', 'IsGitHub', 'IsAcessoLink'],
            Python: ["Image", "Titulo", "Link"],
            Servicos: ["Capa", "Titulo", "Sobre", "Link"]
        }

        // Garantir que keys seja array
        if (!Array.isArray(keys)) {
            keys = [keys]
        }

        const results = {}

        for (const key of keys) {
            if (!validationRules[key]) {
                console.error(`Chave "${key}" não está definida nas regras de validação.`)
                continue
            }

            // Validação para a chave atual
            if (!validateDataKey(data, key, validationRules[key])) {
                console.error(`Erro ao validar dados para a chave: ${key}`)
                continue
            }

            // Extrair dados
            results[key] = data.flatMap(obj => {
                const value = obj[key]
                if (!value) return []

                // Caso seja array direto
                if (Array.isArray(value)) return value

                // Caso seja objeto → adiciona a categoria
                if (typeof value === "object") {
                    return Object.entries(value).flatMap(([categoria, itens]) =>
                        itens.map(item => ({
                            ...item,
                            Categoria: categoria
                        }))
                    )
                }

                return []
            })
        }

        return { status: true, data: results }

    } catch (error) {
        console.error('Error fetching data:', error)
        return { status: false, data: null }
    }
}

export { GetInfoInDataJson }
