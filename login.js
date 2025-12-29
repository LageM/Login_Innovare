const WEBHOOK_LOGIN = "https://lagem/webhook/login";

async function login() {
  const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
  const nasc = document.getElementById("nascimento").value.replace(/\D/g, "");
  const erro = document.getElementById("erro");
  const remember = document.getElementById("remember").checked;

  erro.textContent = "";

  if (cpf.length !== 11 || nasc.length !== 8) {
    erro.textContent = "CPF ou data inválidos.";
    return;
  }

  try {
    const url = `${WEBHOOK_LOGIN}?cpf=${cpf}&data_nascimento=${nasc}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      erro.textContent = data.message || "Acesso negado.";
      return;
    }

    localStorage.setItem("usuario", JSON.stringify({
      nome: data.nome,
      secao: data.secao
    }));

    if (remember) {
      localStorage.setItem("remember_login", JSON.stringify({ cpf, nasc }));
    }

    window.location.href = "home.html";

  } catch (e) {
    erro.textContent = "Erro ao conectar ao servidor.";
    console.error(e);
  }
}
