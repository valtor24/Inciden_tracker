document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const menuItems = document.querySelectorAll(".dropdown-menu li");
  
    // Muestra u oculta el menú al hacer clic en el botón
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Evita que el evento se propague y cierre el menú inmediatamente
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });
  
    // Cambia el idioma seleccionado y actualiza el botón
    menuItems.forEach(item => {
      item.addEventListener("click", function () {
        const selectedLang = this.dataset.lang; // Obtiene el idioma del atributo data-lang
        dropdownBtn.textContent = `${selectedLang} ▼`; // Actualiza el texto del botón
        dropdownMenu.style.display = "none"; // Cierra el menú
      });
    });
  
    // Cierra el menú si se hace clic fuera de él
    document.addEventListener("click", function () {
      dropdownMenu.style.display = "none";
    });
  });
  

/*const nav = document.querySelector("nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})*/