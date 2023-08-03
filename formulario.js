// const firebaseConfig = {
//   apiKey: "AIzaSyB7Uaucaj_P_7fUjCwm66daf_UVpOMFpRc",
//   authDomain: "met-saud.firebaseapp.com",
//   databaseURL: "https://met-saud-default-rtdb.firebaseio.com",
//   projectId: "met-saud",
//   storageBucket: "met-saud.appspot.com",
//   messagingSenderId: "412539453888",
//   appId: "1:412539453888:web:598f256cf829e2fd814825"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDKob-B0j3wr00DW9123F611OCA9Te8YoM",
  authDomain: "metasaudebd.firebaseapp.com",
  databaseURL: "https://metasaudebd-default-rtdb.firebaseio.com/",
  projectId: "metasaudebd",
  storageBucket: "metasaudebd.appspot.com",
  messagingSenderId: "254549055773",
  appId: "1:254549055773:web:85d985f84d3b7c9174a9f4",
  measurementId: "G-0PM66J8B4Z"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const formularioContainer = document.getElementById('formulario-container');

// Obtenha o ID do paciente da URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id') || (new URLSearchParams(window.location.search.slice(1))).get('id');
//const pacienteId = urlParams.get('id');

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
      <label for="sexo">Sexo:</label>
      <input type="text" value="${data.sexo}" disabled>
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
      <label for="numero carteira">No. Carteira:</label>
      <input type="text" value="${data.carteira}" disabled>
    </div>
    
    <div>
      <label for="nome da mae">Mãe:</label>
      <input type="text" value="${data.mae}" disabled>
    </div>

    <div>
      <label for="endereco">Endereço:</label>
      <input type="text" value="${data.end}" disabled>
    </div>

    <div>
      <label for="city">Cidade:</label>
      <input type="text" value="${data.cep}" disabled>
      <label name="uf" id="uf">UF:</label>
      <input type="text" value="${data.uf}" disabled>
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