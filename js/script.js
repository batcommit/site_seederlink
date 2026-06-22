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
//  Lógica de Busca de Parceiros - Plataforma Inteligente
// =========================================================

var perfilSelecionado = "";

function selecionarPerfil(tipo) {
  perfilSelecionado = tipo;

    // Remove destaque de todos os cards
  var cards = document.querySelectorAll(".perfil-card");
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("ativo");
  }

  // Adiciona destaque ao card clicado
  var cardSelecionado = document.querySelector(
    ".perfil-card[onclick=\"selecionarPerfil('" + tipo + "')\"]"
  );
  cardSelecionado.classList.add("ativo");

  document.getElementById("estado-container").style.display = "block";
}

function buscarParceiros() {
  var estado = document.getElementById("estado").value;
  var resultado = document.getElementById("resultado");

  var parceiros = [
    "Fazenda Boa Terra - SP - produtor",
    "AgroFuturo Investimentos - SP - investidor",
    "Sítio Esperança - MG - produtor",
    "Capital Verde - MG - investidor"
  ];

  resultado.innerHTML = ""; // limpa antes de exibir

  if (estado === "") {
    resultado.innerHTML = "<p>Por favor, selecione um estado.</p>";
    return;
  }

  var encontrados = false;
  for (var i = 0; i < parceiros.length; i++) {
    if (parceiros[i].includes(estado) && parceiros[i].includes(perfilSelecionado)) {
      var nome = parceiros[i].split(" - ")[0];
      resultado.innerHTML += `<p class="parceiro-opcao" onclick="selecionarParceiro(this, '${nome}')">${nome}</p>`;
      encontrados = true;
    }
  }

  if (!encontrados) {
    resultado.innerHTML = "<p>Nenhum parceiro encontrado.</p>";
  }
}


function selecionarParceiro(elemento, nome) {
  var opcoes = document.querySelectorAll(".parceiro-opcao");
  for (var i = 0; i < opcoes.length; i++) {
    opcoes[i].classList.remove("ativo");
  }

  elemento.classList.add("ativo");
  mostrarInfo(nome);

  // Adiciona botão "Seguir com processo"
  var seguirBtn = document.createElement("button");
  seguirBtn.textContent = "Seguir com o processo";
  seguirBtn.style.marginTop = "15px";
  seguirBtn.style.padding = "12px 24px";
  seguirBtn.style.borderRadius = "10px";
  seguirBtn.style.background = "#2E7D32";
  seguirBtn.style.color = "white";
  seguirBtn.style.fontWeight = "600";
  seguirBtn.style.border = "none";
  seguirBtn.style.cursor = "pointer";
  seguirBtn.style.transition = "0.3s ease";

  // Remove botão anterior se já existir
  var existente = document.querySelector("#seguir-processo-btn");
  if (existente) {
    existente.remove();
  }
  seguirBtn.id = "seguir-processo-btn";

  elemento.insertAdjacentElement("afterend", seguirBtn);

  // Ação ao clicar no botão
  seguirBtn.addEventListener("click", () => {
    alert("Para seguir com o processo, precisamos que você informe seus dados na seção de Contato.");
    document.querySelector("#Contato").scrollIntoView({ behavior: "smooth" });
  });
}



// =========================================================
//  Informações de Parceiros - Plataforma Inteligente
// =========================================================

var dadosParceiros = {
  "Fazenda Boa Terra": {
    tempo: "12 anos no mercado",
    foco: "Cultivo de hortaliças orgânicas",
    objetivo: "Busca investidores para ampliar exportação"
  },
  "AgroFuturo Investimentos": {
    tempo: "8 anos de atuação",
    foco: "Investimentos em logística agro",
    objetivo: "Procura produtores para parceria em transporte"
  },
  "Sítio Esperança": {
    tempo: "15 anos no mercado",
    foco: "Produção de café orgânico",
    objetivo: "Busca apoio para expandir exportação"
  },
  "Capital Verde": {
    tempo: "10 anos de atuação",
    foco: "Investimentos em sustentabilidade",
    objetivo: "Procura produtores para projetos de energia limpa"
  }
};

function mostrarInfo(nome) {
  var dados = dadosParceiros[nome];
  if (dados) {
    // Atualiza conteúdo dos cards
    document.getElementById("card1").innerHTML =
      `<h3>Tempo de Mercado</h3><p>${dados.tempo}</p>`;
    document.getElementById("card2").innerHTML =
      `<h3>Foco Principal</h3><p>${dados.foco}</p>`;
    document.getElementById("card3").innerHTML =
      `<h3>Objetivo Atual</h3><p>${dados.objetivo}</p>`;

    // Move o localizador para a esquerda
    document.getElementById("localizador").classList.add("move-left");

    // Exibe os cards informativos
    var features = document.getElementById("cards-info");
    features.classList.add("show");

    // Dispara animação nos cards
    var cards = document.querySelectorAll(".features .feature-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("visible"); // reseta
      void cards[i].offsetWidth;            // força reflow
      cards[i].classList.add("visible");    // aplica animação
    }
  }
}



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
