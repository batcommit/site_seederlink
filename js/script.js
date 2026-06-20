// =========================================================
// ANIMAÇÕES AO SCROLL
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        ".fade-in, .slide-left, .slide-right, .zoom-in, .bar"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            } else {

                entry.target.classList.remove("visible");
            }

        });

    }, {
        threshold: 0.15
    });

    elementos.forEach(el => observer.observe(el));

});


// =========================================================
// NAVBAR BACKGROUND AO SCROLL
// =========================================================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if(window.scrollY > 50){

        nav.classList.add("nav-scroll");

    } else {

        nav.classList.remove("nav-scroll");
    }

});


// =========================================================
//  Lógica de Validação do Formulário
// =========================================================

   document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contato-form");
    const nomeInput = form.querySelector("input[type='text']");
    const emailInput = form.querySelector("input[type='email']");
    const telefoneInput = form.querySelector("input[type='tel']");
    const mensagemInput = form.querySelector("textarea");
    const submitBtn = form.querySelector("button");

    // Função para criar/mostrar mensagens de erro
    function mostrarErro(input, mensagem) {
    let msg = input.nextElementSibling;
    if (!msg || (!msg.classList.contains("erro-msg") && !msg.classList.contains("sucesso-msg"))) {
        msg = document.createElement("small");
        input.insertAdjacentElement("afterend", msg);
    }
    msg.className = "erro-msg";
    msg.textContent = mensagem;
    }


    // Função para criar/mostrar mensagens de sucesso
    function mostrarSucesso(input, mensagem) {
    let msg = input.nextElementSibling;
    if (!msg || (!msg.classList.contains("erro-msg") && !msg.classList.contains("sucesso-msg"))) {
        msg = document.createElement("small");
        input.insertAdjacentElement("afterend", msg);
    }
    msg.className = "sucesso-msg";
    msg.textContent = mensagem;
    }


    // Validação do Nome
    function validarNome() {
        const valor = nomeInput.value.trim();
        if (valor === "") {
            mostrarErro(nomeInput, "*Campo Obrigatório.");
            return false;
        }
        const partes = valor.split(" ");
        if (partes.length < 2) {
            mostrarErro(nomeInput, "Digite nome e sobrenome.");
            return false;
        }
        if (partes.some(p => p.length < 2)) {
            mostrarErro(nomeInput, "Nome e Sobrenome devem ter pelo menos 2 letras.");
            return false;
        }
        mostrarSucesso(nomeInput, "Informação válida ✓")
        return true;
    }

    // Validação do Email
    function validarEmail() {
        const valor = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (valor === "") {
            mostrarErro(emailInput, "*Campo Obrigatório.");
            return false;
        }
        if (!regex.test(valor)) {
            mostrarErro(emailInput, "Digite um email válido.");
            return false;
        }
        mostrarSucesso(emailInput, "Informação válida ✓")
        return true;
    }

    // Validação do Telefone
    function validarTelefone() {
    let valor = telefoneInput.value.replace(/\D/g, ""); // remove tudo que não for número

    // Limitar a 11 dígitos
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }

    // Formatar como (XX) 9 XXXX-XXXX
    let formatado = valor;
    if (valor.length > 0) {
        if (valor.length <= 2) {
            formatado = `(${valor}`;
        } else if (valor.length <= 3) {
            formatado = `(${valor.slice(0,2)}) ${valor.slice(2)}`;
        } else if (valor.length <= 7) {
            formatado = `(${valor.slice(0,2)}) ${valor.slice(2,3)} ${valor.slice(3)}`;
        } else {
            formatado = `(${valor.slice(0,2)}) ${valor.slice(2,3)} ${valor.slice(3,7)}-${valor.slice(7)}`;
        }
    }

    telefoneInput.value = formatado;

    // Validação final
    const apenasNumeros = valor;

    if (valor === "") {
            mostrarErro(telefoneInput, "*Campo Obrigatório.");
            return false;
    }

    if (apenasNumeros.length !== 11) {
        mostrarErro(telefoneInput, "Digite um telefone válido com 11 dígitos (DDD + celular).");
        return false;
    }

    // Verificar se o primeiro dígito após o DDD é 9
    if (apenasNumeros[2] !== "9") {
        mostrarErro(telefoneInput, "O número de celular deve começar com 9 após o DDD.");
        return false;
    }

    mostrarSucesso(telefoneInput, "Informação válida ✓");
    return true;
    }

    // Evento para aplicar formatação em tempo real
    telefoneInput.addEventListener("input", () => {
        validarTelefone();
        atualizarBotao();
    });



    // Validação da Mensagem
    function validarMensagem() {
        const valor = mensagemInput.value.trim();
        if (valor === "") {
            mostrarErro(mensagemInput, "*Campo Obrigatório.");
            return false;
        }
        if (valor.length > 500) {
            mostrarErro(mensagemInput, "A mensagem deve ter no máximo 500 caracteres.");
            return false;
        }
        mostrarSucesso(mensagemInput, "Informação válida ✓");
        return true;
    }

    // Ativar/Desativar botão de envio
    function atualizarBotao() {
        if (validarNome() && validarEmail() && validarTelefone() && validarMensagem()) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Eventos de validação em tempo real
    nomeInput.addEventListener("input", () => { validarNome(); atualizarBotao(); });
    emailInput.addEventListener("input", () => { validarEmail(); atualizarBotao(); });
    telefoneInput.addEventListener("input", () => { validarTelefone(); atualizarBotao(); });
    mensagemInput.addEventListener("input", () => { validarMensagem(); atualizarBotao(); });

    // Validação final no envio
    form.addEventListener("submit", (e) => {
    e.preventDefault(); // impede envio real para teste

    if (validarNome() && validarEmail() && validarTelefone() && validarMensagem()) {
        const msgSucesso = form.querySelector(".mensagem-sucesso");
        msgSucesso.textContent = "Mensagem enviada com sucesso!";
        msgSucesso.style.display = "block";

        // Opcional: limpar os campos após envio
        form.reset();
        submitBtn.disabled = true; // volta a desabilitar até preencher novamente
    }
    });


    // Inicialmente desabilita o botão
    submitBtn.disabled = true;
    });
