// // Récupération des articles éventuellement stockées dans le localStorage
// let users = window.localStorage.getItem("utilisateurs");
// if (users === null) {
//     // Récupération des pièces depuis l'API HTTP'
//     const reponse = await fetch("http://localhost:8000/user/", {
//         headers: {
//             'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
//         }
//     });
//     // Récupération des pièces depuis le fichier JSON
//     // const reponse = await fetch('articles.json');
//     let users = await reponse.json();
//     // Transformation des pièces en JSON
//     const valeurPieces = JSON.stringify(users);
//     // Stockage des informations dans le localStorage
//     window.localStorage.setItem("utilisateurs", valeurPieces);    
// }
// else {
//     users = JSON.parse(users);
// }




const signIn = document.querySelector(".button2");
signIn.addEventListener("click", async function () {
  // Récupérer les données du formulaire
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Créer un objet contenant les données de l'utilisateur
  const user = {
    firstname,
    lastname,
    email,
    password,
    // isAdmin: false // Par défaut, l'utilisateur n'est pas un administrateur
  };

  try {
    // Effectuer une requête POST vers le backend
    const response1 = await fetch('http://localhost:8000/user/register', {
      method: 'POST',
      headers: {
        'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    // Vérifier la réponse du serveur
    if (response1.ok) {
      const data = await response1.json();
      // Utilisateur créé avec succès
      console.log('Utilisateur créé :', data);
      // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = "Inscription réussie, vous pouvez maintenant vous connecter.";
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "http://127.0.0.1:8080/connexion.html";
      }, 3000);
    } else {
      const errorData = await response1.json();
      // Une erreur s'est produite lors de la création de l'utilisateur
      console.log('Erreur lors de la création de l\'utilisateur:', errorData.message);
      // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = 'Erreur lors de la création de l\'utilisateur:', errorData.message;
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "http://127.0.0.1:8080/connexion.html";
      }, 3000);
    }
    console.log(response);
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    console.log('Erreur lors de la requête:', error.message);
    // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
    document.querySelector(".form").innerHTML = "";
    const affichageRep = document.querySelector(".titre");
    const reponseConnexion = document.createElement("h3");
    reponseConnexion.innerText = 'Erreur lors de la requête:', error.message;
    affichageRep.appendChild(reponseConnexion);
    // Attendre 3 secondes (3000 millisecondes)
    setTimeout(function() {
    // Rediriger l'utilisateur vers une autre page après 3 secondes
      window.location.href = "http://127.0.0.1:8080/connexion.html";
    }, 3000);
  }
});


const login = document.querySelector(".button1");
login.addEventListener("click", async function () {
  // Récupérer les données du formulaire
  const userEmail = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Créer un objet contenant les données de l'utilisateur
  const user = {
    userEmail,
    password,
    // isAdmin: false // Par défaut, l'utilisateur n'est pas un administrateur
  };
  console.log(user.userEmail);

  try {
    // Effectuer une requête POST vers le backend
    const response = await fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: {
        'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    // Vérifier la réponse du serveur
    if (response.ok) {
      const data = await response.json();
      //enregistrement d'un token
      // Get the JWT
      const token = data.token;
      console.log(token);
      // Store the JWT in local storage or a cookie
      localStorage.setItem('token', token);
      // Utilisateur connecté avec succès
      console.log('Utilisateur connecté :', data);
      // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = "Connexion réussie, vous allez être redirigé vers la page d'accueil.";
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "http://127.0.0.1:8080/index.html";
      }, 3000);
      
    } else {
      const errorData = await response.json();
      // Une erreur s'est produite lors de la création de l'utilisateur
      console.log('Erreur lors de la connexion de l\'utilisateur:', errorData.message);
      // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = 'Erreur lors de la connexion de l\'utilisateur:', errorData.message;
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "http://127.0.0.1:8080/connexion.html";
      }, 3000);
    }
    console.log(response);
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    console.log('Erreur lors de la requête:', error.message);
    // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
    document.querySelector(".form").innerHTML = "";
    const affichageRep = document.querySelector(".titre");
    const reponseConnexion = document.createElement("h3");
    reponseConnexion.innerText = 'Erreur lors de la requête:', error.message;
    affichageRep.appendChild(reponseConnexion);
    // Attendre 3 secondes (3000 millisecondes)
    setTimeout(function() {
    // Rediriger l'utilisateur vers une autre page après 3 secondes
      window.location.href = "http://127.0.0.1:8080/connexion.html";
    }, 3000);
  }
});




// const signIn = document.querySelector(".button2");
// signIn.addEventListener("click", async function () {
//   // Récupérer les données du formulaire
//   const firstname = document.getElementById("firstname").value;
//   const lastname = document.getElementById("lastname").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   // Créer un objet contenant les données de l'utilisateur
//   const user = {
//     firstname,
//     lastname,
//     email,
//     password,
//     // isAdmin: false // Par défaut, l'utilisateur n'est pas un administrateur
//   };

//   try {
//     // Effectuer une requête POST vers le backend
//     const response1 = await fetch('http://localhost:8000/user/register', {
//       method: 'POST',
//       headers: {
//         'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });

//     // Vérifier la réponse du serveur
//     if (response1.ok) {
//       const data = await response1.json();
//       // Utilisateur créé avec succès
//       console.log('Utilisateur créé :', data);
//       //On le connecte directement
//       const response2 = await fetch('http://localhost:8000/user/login', {
//         method: 'POST',
//         headers: {
//           'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//       });
//       // Vérifier la réponse du serveur
//       if (response2.ok) {
//         const data = await response2.json();
//         // Utilisateur connecté avec succès
//         console.log('Utilisateur connecté :', data);
//         // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
//         document.querySelector(".form").innerHTML = "";
//         const affichageRep = document.querySelector(".titre");
//         const reponseConnexion = document.createElement("h3");
//         reponseConnexion.innerText = "Connexion réussi, vous allez être redirigé vers la page d'accueil.";
//         affichageRep.appendChild(reponseConnexion);
//         // Attendre 3 secondes (3000 millisecondes)
//         setTimeout(function() {
//         // Rediriger l'utilisateur vers une autre page après 3 secondes
//           window.location.href = "http://127.0.0.1:8080/index.html";
//         }, 3000);
      
//       } else {
//         const errorData = await response2.json();
//         // Une erreur s'est produite lors de la création de l'utilisateur
//         console.log('Erreur lors de la connexion de l\'utilisateur:', errorData.message);
//         // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
//         document.querySelector(".form").innerHTML = "";
//         const affichageRep = document.querySelector(".titre");
//         const reponseConnexion = document.createElement("h3");
//         reponseConnexion.innerText = 'Erreur lors de la connexion de l\'utilisateur:', errorData.message;
//         affichageRep.appendChild(reponseConnexion);
//         // Attendre 3 secondes (3000 millisecondes)
//         setTimeout(function() {
//         // Rediriger l'utilisateur vers une autre page après 3 secondes
//           window.location.href = "http://127.0.0.1:8080/connexion.html";
//         }, 3000);
//       }

//       // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
//       document.querySelector(".form").innerHTML = "";
//       const affichageRep = document.querySelector(".titre");
//       const reponseConnexion = document.createElement("h3");
//       reponseConnexion.innerText = "Inscription réussi, vous pouvez maintenant vous connecter.";
//       affichageRep.appendChild(reponseConnexion);
//       // Attendre 3 secondes (3000 millisecondes)
//       setTimeout(function() {
//       // Rediriger l'utilisateur vers une autre page après 3 secondes
//         window.location.href = "http://127.0.0.1:8080/connexion.html";
//       }, 3000);
//     } else {
//       const errorData = await response1.json();
//       // Une erreur s'est produite lors de la création de l'utilisateur
//       console.log('Erreur lors de la création de l\'utilisateur:', errorData.message);
//       // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
//       document.querySelector(".form").innerHTML = "";
//       const affichageRep = document.querySelector(".titre");
//       const reponseConnexion = document.createElement("h3");
//       reponseConnexion.innerText = 'Erreur lors de la création de l\'utilisateur:', errorData.message;
//       affichageRep.appendChild(reponseConnexion);
//       // Attendre 3 secondes (3000 millisecondes)
//       setTimeout(function() {
//       // Rediriger l'utilisateur vers une autre page après 3 secondes
//         window.location.href = "http://127.0.0.1:8080/connexion.html";
//       }, 3000);
//     }
//     console.log(response1);
//   } catch (error) {
//     // Une erreur s'est produite lors de la requête
//     console.log('Erreur lors de la requête:', error.message);
//     // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
//     document.querySelector(".form").innerHTML = "";
//     const affichageRep = document.querySelector(".titre");
//     const reponseConnexion = document.createElement("h3");
//     reponseConnexion.innerText = 'Erreur lors de la requête:', error.message;
//     affichageRep.appendChild(reponseConnexion);
//     // Attendre 3 secondes (3000 millisecondes)
//     setTimeout(function() {
//     // Rediriger l'utilisateur vers une autre page après 3 secondes
//       window.location.href = "http://127.0.0.1:8080/connexion.html";
//     }, 3000);
//   }
// });