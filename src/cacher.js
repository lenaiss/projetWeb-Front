// import jwtDecode from 'jwt-decode';
// const jwt = require('jsonwebtoken');
// import jwt from 'jwt-decode';

const token = localStorage.getItem('token');
console.log(token);

// let idUser = null;
// let firstName = null;
// let lastName = null;
// let email = null;
// let role = null;

if (token !== null) {
    // state.connected = true;

    // Vérifier la validité du token en utilisant la clé publique
    // try {
    //     const decoded = jwt.verify(token, process.env.PUBLIC_KEY);
    //     console.log('Token décodé :', decoded);
    // } catch (error) {
    //     console.error('Erreur lors de la vérification du token :', error);
    // }

    // try {
    //     // Decode the token
    //     const decoded = jwtDecode(token);

    //     idUser = decoded.dataId;
    //     firstName = decoded.dataFirstname;
    //     lastName = decoded.dataLastname;
    //     email = decoded.dataEmail;
    //     role = decoded.dataRole;


    // } catch (error) {
    //     console.error('Failed to decode token:', error);
    // }
    // console.log(idUser, firstName, lastName, email, role);

    // // Vérifier si l'utilisateur est connecté en vérifiant la présence du cookie d'authentification
    // function isUserLoggedIn() {
    //     return token.role=="user";
    // }

    // if(isUserLoggedIn()) {
    //     document.getElementById("connexion-link").style.display = "none";
    //     document.getElementById("compte-link").style.display = "block";
    // }
    // else {
    //     document.getElementById("compte-link").style.display = "none";
    //     document.getElementById("connexion-link").style.display = "block";
    // }
    document.getElementById("connexion-link").style.display = "none";
    document.getElementById("compte-link").style.display = "block";
}
else {
    document.getElementById("compte-link").style.display = "none";
    document.getElementById("connexion-link").style.display = "block";
}











// function isVisibleConnexion() {
//     if(isUserLoggedIn()) {
//         // Utilisateur connecté : masquer le lien de connexion/inscription
//         document.getElementById("connexion-link").style.display = "none";
//         document.getElementById("compte-link").style.display = "block";
//     }
// }
// isVisibleConnexion();

// function isVisibleCompte() {
//     if (!isUserLoggedIn()) {
//         // Utilisateur non connecté : masquer le lien du compte
//         document.getElementById("compte-link").style.display = "none";
//         document.getElementById("connexion-link").style.display = "block";
//     }
// }
// isVisibleCompte();