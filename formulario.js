const firebaseConfig = {
  apiKey: "AIzaSyAlc--Ud8EsT7_D9np3AgUS8-jN18clkOI",
  authDomain: "meta-sau.firebaseapp.com",
  databaseURL: "https://meta-sau-default-rtdb.firebaseio.com",
  projectId: "meta-sau",
  storageBucket: "meta-sau.appspot.com",
  messagingSenderId: "635471066942",
  appId: "1:635471066942:web:5a080be8301c56c1f0de6f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const formularioContainer = document.getElementById('formulario-container');

// Obtenha o ID do paciente da URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');

if (pacienteId) {
  // Se o ID do paciente estiver presente na URL, obtenha os dados do paciente e exiba o formulário
  db.collection('pacientes').doc(pacienteId).get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      exibirFormulario(data);
    } else {
      console.log("Paciente não encontrado");
    }
  }).catch((error) => {
    console.log("Erro ao obter os dados do Cloud Firestore:", error);
  });
} else {
  console.log("ID do paciente não fornecido na URL");
}

function exibirFormulario(data) {
  formularioContainer.innerHTML = ''; // Limpar qualquer conteúdo anterior

  const form = document.createElement('form');
  form.innerHTML = `
    <div>
      <label for="nome">Nome:</label>
      <input type="text" value="${data.name}" disabled>
    </div>

    <div>
      <label for="cpf">CPF:</label>
      <input type="text" value="${data.cpf}" disabled>
      <label for="data">Data Nasc:</label>
      <input type="text" value="${data.aniv}" disabled>
    </div>

    <div>
      <label for="operadora">Operadora:</label>
      <input type="text" value="${data.operadora}" disabled>
    </div>

    <div>
      <label for="endereco">Endereço:</label>
      <input type="text" value="${data.end}" disabled>
    </div>

    <div>
      <label for="city">Cidade/UF:</label>
      <input type="text" value="${data.cep}" disabled>
    </div>

    <div>
      <label for="diag">Diagnóstico:</label>
      <input type="text" value="${data.diag}" disabled>
    </div>

    <div id="compl">
      <label for="comp">Complemento:</label>
      <textarea disabled>${data.text}</textarea>
    </div>
    <div class="button">
        <a href="valor.html?id=${pacienteId}"><button id="botao" type="button">Prosseguir p/Oferta</button></a>
    </div>
  `;

  formularioContainer.appendChild(form);
}