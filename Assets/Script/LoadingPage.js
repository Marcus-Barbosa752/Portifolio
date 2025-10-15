const WindowLoading = document.getElementById('WindowLoading')
const SpanLoadingPage = document.getElementById('SpanLoadingPage')

let CountLoadingPage = 0
let Intervalo = undefined
const FormatTimeLoadingPage = Time => {
    if (Time < 10) Time = `00${Time}`
    if (Time >= 10 && Time < 100) Time = `0${Time}`

    return Time
}

Intervalo = setInterval(() => {
    CountLoadingPage++

    if (CountLoadingPage >= 100) {
        CountLoadingPage = 100
        setTimeout(() => {
            CountLoadingPage = 0
            Intervalo = undefined
            WindowLoading.style.display = 'none'
            clearInterval(Intervalo)
        }, 500)
    }

    SpanLoadingPage.textContent = `${FormatTimeLoadingPage(CountLoadingPage)}%`
}, 50)
