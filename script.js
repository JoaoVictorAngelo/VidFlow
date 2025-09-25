const containerVideos = document.querySelector(".videos__container");
// Seleciona a <ul> do HTML onde os vídeos serão inseridos

async function buscarEMostrarVideos() {
    try {
        // Faz a requisição para a API local e espera a resposta
        const buscaAPI = await fetch("http://localhost:3000/videos");

        // Converte a resposta da API em JSON (um array de objetos)
        const videos = await buscaAPI.json();
    
        // Percorre cada objeto dentro do array e chama cada um de "video"
        videos.forEach((video) => { 
            // Validação: se o vídeo não tiver categoria, lança um erro
            if(video.categoria == "") {
                throw new Error(`Vídeo não tem categoria | ID: ${video.id}`)
            }

            // Para cada vídeo, adiciona dinamicamente o HTML correspondente na <ul>
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
        })        

    } catch (error) {
        // Caso haja erro na requisição, conversão ou validação, mostra a mensagem na tela
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`
    }
}

// Executa a função para buscar e exibir os vídeos
buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtraPesquisa);

function filtraPesquisa() {
    const videos = document.querySelectorAll(".videos__item");

    if (barraDePesquisa.value != "") {
        for (let video of videos) {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block"
            }
            
        }
    } else {
        video.style.display = "block"
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item")

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item")
    for(let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}