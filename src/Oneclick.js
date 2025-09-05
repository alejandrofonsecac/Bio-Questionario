function Oneclick(){
    const element = document.getElementById("meuElemento");
    element.addEventListener("click", minhaFuncao, {once: true});

    function minhaFuncao(evento) {
        console.log("O evento foi acionado pela primeira vez!");
    }
}