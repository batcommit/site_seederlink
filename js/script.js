// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

  // Seleciona todos os elementos que possuem a classe .fade-in
  const elementos = document.querySelectorAll(".fade-in, .etapa-animada, .bar");

  // Cria um observador para monitorar quando os elementos entram ou saem da viewport
  const observer = new IntersectionObserver((entries) => {
    // Percorre cada elemento observado
    entries.forEach(entry => {
      // Se o elemento estiver visível na tela (intersectando a viewport)
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");   // adiciona a classe .visible → ativa a animação
      } else {
        entry.target.classList.remove("visible"); // remove a classe .visible → volta ao estado inicial
      }
    });
  }, { threshold: 0.2 }); // threshold define que a animação dispara quando 20% do elemento aparece

  // Aplica o observador a cada elemento com a classe .fade-in
  elementos.forEach(el => observer.observe(el));
});