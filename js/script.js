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

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("loginError");

  errorMsg.style.display = "none";
  errorMsg.textContent = "";

  if (!username || !password) {
      errorMsg.textContent = "Por favor, completa todos los campos";
      errorMsg.style.display = "block";
      return;
  }

  try {
      const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
          // Si quieres guardar info en localStorage/sessionStorage, hazlo aquí
          window.location.href = "dashboard.html"; // o la ruta que uses
      } else {
          errorMsg.textContent = data.message || "Usuario o contraseña incorrectos.";
          errorMsg.style.display = "block";
      }
  } catch (error) {
      console.error("Error en login:", error);
      errorMsg.textContent = "Error de conexión con el servidor.";
      errorMsg.style.display = "block";
  }
}
