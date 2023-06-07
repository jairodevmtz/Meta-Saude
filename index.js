
// Exemplo de uso durante o processo de login
firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Login bem-sucedido
        const user = userCredential.user;
        const userEmail = user.email;

        // Chamando a função para buscar o provedor com base no e-mail
        buscarProvedorPorEmail(userEmail);
    })
    .catch((error) => {
        // Tratamento de erros durante o login
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro durante o login:', errorCode, errorMessage);
    });