const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");
const botaoTema = document.querySelector(".botao-tema");
const formulario = document.querySelector("#formulario-contato");
const mensagemFormulario = document.querySelector("#mensagem-formulario");
const anoAtual = document.querySelector("#ano-atual");

anoAtual.textContent = new Date().getFullYear();

function obterTemaSalvo() {
    try {
        return localStorage.getItem("tema");
    } catch (erro) {
        return null;
    }
}

function salvarTema(tema) {
    try {
        localStorage.setItem("tema", tema);
    } catch (erro) {
        return;
    }
}

function atualizarTextoTema() {
    const temaEscuro = document.documentElement.classList.contains("tema-escuro") || document.body.classList.contains("tema-escuro");
    botaoTema.textContent = temaEscuro ? "Tema claro" : "Tema escuro";
}

function aplicarTemaSalvo() {
    const temaSalvo = obterTemaSalvo();

    if (temaSalvo === "escuro") {
        document.documentElement.classList.add("tema-escuro");
        document.body.classList.add("tema-escuro");
    }
}

aplicarTemaSalvo();
atualizarTextoTema();

botaoMenu.addEventListener("click", () => {
    const menuAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
});

menu.addEventListener("click", (evento) => {
    if (evento.target.tagName === "A") {
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    }
});

botaoTema.addEventListener("click", () => {
    document.documentElement.classList.toggle("tema-escuro");
    document.body.classList.toggle("tema-escuro");

    const temaAtual = document.documentElement.classList.contains("tema-escuro") ? "escuro" : "claro";
    salvarTema(temaAtual);
    atualizarTextoTema();
});

function mostrarErro(campo, mensagem) {
    const elementoErro = document.querySelector(`#erro-${campo}`);
    elementoErro.textContent = mensagem;
}

function limparErros() {
    mostrarErro("nome", "");
    mostrarErro("email", "");
    mostrarErro("mensagem", "");
    mensagemFormulario.textContent = "";
}

function emailValido(email) {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    limparErros();

    const nome = formulario.nome.value.trim();
    const email = formulario.email.value.trim();
    const mensagem = formulario.mensagem.value.trim();
    let formularioValido = true;

    // Validação exigida pela atividade: campos obrigatórios e formato do e-mail.
    if (nome === "") {
        mostrarErro("nome", "Informe seu nome.");
        formularioValido = false;
    }

    if (email === "") {
        mostrarErro("email", "Informe seu e-mail.");
        formularioValido = false;
    } else if (!emailValido(email)) {
        mostrarErro("email", "Informe um e-mail válido, como nome@dominio.com.");
        formularioValido = false;
    }

    if (mensagem === "") {
        mostrarErro("mensagem", "Escreva uma mensagem.");
        formularioValido = false;
    }

    if (!formularioValido) {
        mensagemFormulario.textContent = "Revise os campos destacados antes de enviar.";
        return;
    }

    formulario.reset();
    mensagemFormulario.textContent = "Mensagem enviada com sucesso!";
});
