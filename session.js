const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
  window.location.href = "login.html";
} else {
  document.getElementById("boasvindas").textContent =
    `Olá, ${usuario.nome}!`;
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}
