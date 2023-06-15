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

const ofertaForm = document.getElementById('oferta-form');

// Obter o ID do paciente da URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');
const confirmLink = document.getElementById('confirm-link');
if (!pacienteId) {
    console.log("ID do paciente não fornecido na URL");
} else {
    ofertaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o envio do formulário

        const valorInput = document.getElementById('valor');
        const periodoInput = document.getElementById('periodo');
        const obsInput = document.getElementById('obs');

        const ofertaData = {
            valor: valorInput.value,
            periodo: periodoInput.value,
            obs: obsInput.value,
            pacienteId: pacienteId, // Adicionar o ID do paciente aos dados da oferta
            hospital: "" // O nome do hospital será obtido dinamicamente
        };

        buscarHospital(ofertaData);
    });
}

function buscarHospital(ofertaData) {
    // Autenticar o usuário
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userEmail = user.email;
            // Consultar a coleção 'hospitais' usando o email do usuário autenticado
            db.collection('hospitais').where('login', '==', userEmail).get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const hospitalData = doc.data();
                        ofertaData.hospital = hospitalData.nome; // Obtém o nome do hospital

                        exibirConfirmacao(ofertaData);
                    });
                } else {
                    console.log("Documento do hospital não encontrado");
                }
            }).catch((error) => {
                console.log("Erro ao buscar o documento do hospital:", error);
            });
        } else {
            console.log("Usuário não autenticado");
        }
    });
}

function exibirConfirmacao(ofertaData) {
    const confirmacaoForm = document.createElement('form');
    const confirmacaoText = document.createElement('h5');
    confirmacaoText.textContent = 'Confirmando a oferta, a operadora receberá a notificação para aprovação ou não.';


    const btnSim = document.createElement('button');
    btnSim.textContent = 'Sim';
    btnSim.type = 'button';
    const btnSimId = 'botao-' + ofertaData.pacienteId; // Unique ID for the button
    btnSim.id = 'botao';
    btnSim.addEventListener('click', () => {

        /* if (confirmLink) {
             const ofertaRef = db.collection('ofertas').doc(pacienteId);
             ofertaRef.get().then((ofertaDoc) => {
                 if (ofertaDoc.exists && ofertaDoc.data().opers === 1) {
                     confirmLink.textContent = "Oferta já Feita";
                     confirmLink.classList.add("oferta-feita");
                     confirmLink.disabled = true;
                     confirmLink.href = ''; // Remova o link para impedir que o usuário clique novamente
                 }
             });
         }*/


        /*  const confirmLink = parent.document.getElementById('botao');
          if (confirmLink) {
              confirmLink.textContent = 'Oferta já Feita';
              confirmLink.classList.add('oferta-feita');
              confirmLink.removeAttribute('href');
              confirmLink.href = `oferta.html?id=${pacienteId}`; // Replace with the new link URL
          }*/
        salvarOferta(ofertaData);
    });

    const btnNao = document.createElement('button');
    btnNao.textContent = 'Não';
    btnNao.type = 'button';
    btnNao.addEventListener('click', () => {
        window.location.href = 'hospital.html';
    });

    confirmacaoForm.appendChild(confirmacaoText);
    confirmacaoForm.appendChild(btnSim);
    confirmacaoForm.appendChild(btnNao);

    document.body.innerHTML = '';
    document.body.appendChild(confirmacaoForm);
}



//const confirmLink = document.getElementById('btval');
/*if (confirmLink == null) {
    alert('ta nulo');
}
confirmLink.addEventListener('click', (event) => {
    alert('Link clicado!');
    event.preventDefault(); // Impede o comportamento padrão do link

    // Atualize o link para "Oferta já feita"
    confirmLink.textContent = 'Oferta já feita';
    confirmLink.href = '#'; // Remova o link para impedir que o usuário clique novamente
});*/

/*const confirmLink = document.getElementById('confirm-link');
if (confirmLink) {
    confirmLink.href = `oferta.html?id=${pacienteId}`;
    confirmLink.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Atualize o link para "Oferta já feita"
        confirmLink.textContent = 'Oferta já feita';
        confirmLink.classList.add("oferta-feita");
    });
}*/

function salvarOferta(ofertaData) {
    db.collection('pacientes').doc(ofertaData.pacienteId).get()
        .then((doc) => {
            if (doc.exists) {
                const pacienteData = doc.data();
                const ofertaCompleta = {
                    ...ofertaData,
                    pacientes: pacienteData,
                    opers: 1 // Atualiza o valor de "oper" para 1
                };

                db.collection('ofertas').add(ofertaCompleta)
                    .then(() => {
                        // const felipet = document.getElementById('btval');
                        //   felipet.textContent = 'Felipet'

                        alert('Oferta enviada com sucesso!');


                        /*// Verifica se a oferta já foi feita e atualiza o link "Confirmar"
                        const ofertaRef = db.collection('ofertas').doc(ofertaData.pacienteId);
                        ofertaRef.get().then((ofertaDoc) => {
                            if (ofertaDoc.exists && ofertaDoc.data().opers === 1) {
                                confirmLink.textContent = "Oferta já Feita";
                                confirmLink.classList.add("oferta-feita");
                                confirmLink.disabled = true;
                            }
                        });*/
                        // confirmLink.textContent = 'Oferta já feita';
                        // confirmLink.href = '#'; // Remova o link para impedir que o usuário clique novamente
                        window.location.href = 'hospital.html'; // Redireciona para a página principal após o envio

                    })
                    .catch((error) => {
                        console.log('Erro ao salvar a oferta:', error);
                    });
            } else {
                console.log("Paciente não encontrado");
            }
        })
        .catch((error) => {
            console.log('Erro ao buscar o paciente:', error);
        });
}

/*const confirmLink = document.getElementById('confirm-link');
                        confirmLink.addEventListener('click', (event) => {
                            alert('Link clicado!');
                            event.preventDefault(); // Impede o comportamento padrão do link

                            // Atualize o link para "Oferta já feita"
                            confirmLink.textContent = 'Oferta já feita';
                            confirmLink.href = '#'; // Remova o link para impedir que o usuário clique novamente
                        });*/
