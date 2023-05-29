// Récupération des données de l'utilisateur 1
const reponse1 = await fetch("http://localhost:8000/user/2", {
    headers: {
        'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
    }
});
let utilisateur = await reponse1.json();

// Transformation des pièces en JSON
const donneesUtilisateur = JSON.stringify(utilisateur);
// Stockage des informations dans le localStorage
window.localStorage.setItem("utilisateur", donneesUtilisateur);

function afficherDonnees(user) {

    const nom = document.querySelector(".lastname");
    const nomElement = document.createElement("h4");
    nomElement.innerHTML = user.lastname;
    nom.appendChild(nomElement);

    const prenom = document.querySelector(".firstname");
    const prenomElement = document.createElement("h4");
    prenomElement.innerHTML = user.firstname;
    prenom.appendChild(prenomElement);

    const email = document.querySelector(".email");
    const emailElement = document.createElement("h4");
    emailElement.innerText = user.email;
    email.appendChild(emailElement);

}

afficherDonnees(utilisateur);

const deconnexion = document.getElementById("deco");
deconnexion.addEventListener("click", function () {
    document.querySelector(".commandes").innerHTML = "";
    document.querySelector(".infos").innerHTML = "";
    const affichageRep = document.querySelector(".compte");
    affichageRep.innerHTML = "";
    const reponseDeconnexion = document.createElement("h3");
    reponseDeconnexion.innerText = "Vous avez bien été déconnecté";
    affichageRep.appendChild(reponseDeconnexion);
    localStorage.removeItem('token');
    // Attendre 3 secondes (3000 millisecondes)
    setTimeout(function() {
        // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "http://127.0.0.1:8080/index.html";
    }, 3000);
});

// Récupération des commandes de l'utilisateur 2
const reponse = await fetch("http://localhost:8000/commande/user/2", {
    headers: {
        'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
    }
});
let commandes = await reponse.json();

// Transformation des pièces en JSON
const commandesUtilisateur = JSON.stringify(commandes);
// Stockage des informations dans le localStorage
window.localStorage.setItem("commandes", commandesUtilisateur);

function afficherCommandes() {
    let commandes = window.localStorage.getItem("commandes");
    commandes = JSON.parse(commandes);
    
    // Obtenez la liste d'idCommande sans doublons
    let idCommandes = [...new Set(commandes.map(commande => commande.idCommande))];

    const caseTete = document.querySelector("thead");
    const tr = document.createElement("tr");
    const num = document.createElement("th");
    num.innerText = "Numéro";
    const date = document.createElement("th");
    date.innerText = "Date commande";
    const montant = document.createElement("th");
    montant.innerText = "Montant";
    caseTete.appendChild(tr);
    tr.appendChild(num);
    tr.appendChild(date);
    tr.appendChild(montant);

    let cpt = 0;
    idCommandes.forEach(async function(idC) {
        cpt++;
        const caseArticle = document.querySelector("tbody");
        const tr = document.createElement("tr");
        const num = document.createElement("td");
        num.innerText = idC;
        const date = document.createElement("td");
        const montant = document.createElement("td");
        //Trouver la date de la commande
        const response1 = await fetch("http://localhost:8000/commande/date/"+idC, {
            headers: {
                'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
            }
        });
        let dateC = await response1.json();
        date.innerText = dateC[0].dateCommande;
        const total = await montantTotal(idC);
        montant.innerText = total;
        montant.innerText = total;
        tr.appendChild(num);
        tr.appendChild(date);
        tr.appendChild(montant);
        caseArticle.appendChild(tr);

    });

}

afficherCommandes();

async function montantTotal(idCommande) {

    let total = 0;
    let articles = window.localStorage.getItem("articles");
    articles = JSON.parse(articles);

        //Trouver les articles de la commande
        const response2 = await fetch("http://localhost:8000/commande/articles/"+idCommande, {
            headers: {
                'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
            }
        });
        let idArticles = await response2.json();

// Récupérer les prix pour chaque article
const fetchPrices = idArticles.map(async (idA) => {
    const response3 = await fetch("http://localhost:8000/commande/montant/" + idCommande + "/" + idA.idArticle, {
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
      }
    });
    const prix = await response3.json();
    return prix[0].montant;
  });

  const prices = await Promise.all(fetchPrices);
  total = prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);
  return total;

}


function modifierCommandes() {
    const caseTete = document.querySelector(".thead");
    caseTete.innerHTML = "";
    const caseArticle = document.querySelector(".tbody");
    caseArticle.innerHTML = "";

    let articles = window.localStorage.getItem("articles");
    articles = JSON.parse(articles);

    let commandes = window.localStorage.getItem("commandes");
    commandes = JSON.parse(commandes);
    let idCommandes = commandes.map(commande => commande.idCommande);
    let cpt = 0;

    const tr = document.createElement("tr");
    const num = document.createElement("th");
    num.innerText = "Numéro";
    const preview = document.createElement("th");
    preview.innerText = "Preview";
    const nom = document.createElement("th");
    nom.innerText = "Nom";
    const qt = document.createElement("th");
    qt.innerText = "Quantité";
    const prix = document.createElement("th");
    prix.innerText = "Prix";
    caseTete.appendChild(tr);
    tr.appendChild(num);
    tr.appendChild(preview);
    tr.appendChild(nom);
    tr.appendChild(qt);
    tr.appendChild(prix);
    let total = 0;

    idCommandes.forEach(function(idC) {

        const idA = commandes[cpt].idArticle;
        let qtA = commandes[cpt].quantite;
        cpt++;
        const tr = document.createElement("tr");
        const num = document.createElement("td");
        num.innerText = idC;
        const preview = document.createElement("td");
        const nom = document.createElement("td");
        const qt = document.createElement("td");
        qt.classList.add('quantity-container');
        const divQt = document.createElement("div");
        divQt.classList.add('quantity-controls');
        const prix = document.createElement("td");
        const image = document.createElement("img");
        image.src = articles[idA-1].image;
        nom.innerText = articles[idA-1].nomArticle;
        const majQt = document.createElement("input");
        majQt.setAttribute("type", "number");
        majQt.setAttribute("value", qtA);
        majQt.setAttribute("min", "1");
        majQt.classList.add('quantity-input');
        majQt.setAttribute("id", "quantity-input-"+idA);
        const plus = document.createElement("button");
        plus.classList.add('quantity-increment');
        plus.innerText = "+";
        plus.setAttribute("data-target", "quantity-input-"+idA);
        const moins = document.createElement("button");
        moins.classList.add('quantity-decrement');
        moins.innerText = "-";
        plus.setAttribute("data-target", "quantity-input-"+idA);
        qt.appendChild(divQt);
        divQt.appendChild(moins);
        divQt.appendChild(majQt);
        divQt.appendChild(plus);
        const supprimer = document.createElement("img");
        supprimer.classList.add('supprimer');
        qt.appendChild(supprimer);
        supprimer.src = "images/poubelle.png";
        prix.innerText = articles[idA-1].prix*qtA+"€";
        prix.classList.add("prix");
        preview.appendChild(image);
        tr.appendChild(num);
        tr.appendChild(preview);
        tr.appendChild(nom);
        tr.appendChild(qt);
        tr.appendChild(prix);
        tr.setAttribute("data-idCommande", idC);
        tr.setAttribute("data-idArticle", idA);
        caseArticle.appendChild(tr);

        const quantiteInput = document.getElementById("quantity-input-"+idA);
        tr.setAttribute("data-quantite", quantiteInput.value);
        const prixArticle = articles[idA-1].prix;
        total = total + quantiteInput.value*prixArticle;
        let valuePrev = quantiteInput.value;
        tr.setAttribute("data-montant", articles[idA-1].prix*qtA);

        // Fonction pour mettre à jour le montant total
        const updateTotal = function() {
            let montantArticle = valuePrev * prixArticle;
            total = total - montantArticle; // Soustraire l'ancien montant
            montantArticle = quantiteInput.value * prixArticle;
            total = total + montantArticle; // Ajouter le nouveau montant
            valuePrev = quantiteInput.value; //on enregistre la nouvelle quantité
            // Mettre à jour la valeur de l'attribut data-quantite
            tr.setAttribute("data-quantite", quantiteInput.value);
            prix.innerText = articles[idA-1].prix*valuePrev+"€";
            tr.setAttribute("data-montant", articles[idA-1].prix*valuePrev);
            // const prixTotal = document.querySelector(".total-prix");
            // prixTotal.innerText = "Total : "+total+"€";
        };

        // Gestionnaires d'événements pour la modification de la quantité
        quantiteInput.addEventListener("change", updateTotal);
        quantiteInput.addEventListener("input", updateTotal);

        // Calculer le montant initial de chaque article
        let montantArticlePrev = quantiteInput.value * prixArticle;
        total = total + montantArticlePrev; // Ajouter le montant à total
    });

    // const prixTotal = document.querySelector(".total-prix");
    // prixTotal.innerText = "Total : "+total+"€";

    var quantityInputs = document.querySelectorAll('.quantity-input');
    var quantityIncrements = document.querySelectorAll('.quantity-increment');
    var quantityDecrements = document.querySelectorAll('.quantity-decrement');
    
    quantityIncrements.forEach(function(button) {
        button.addEventListener('click', function() {
            var quantityInput = button.parentElement.querySelector('.quantity-input');
            var quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
            // tr.setAttribute("data-quantite", quantiteInput.value);
            quantityInput.dispatchEvent(new Event('input'));
        });
    });
    
    quantityDecrements.forEach(function(button) {
        button.addEventListener('click', function() {
            var quantityInput = button.parentElement.querySelector('.quantity-input');
            if (quantityInput) {
                var quantity = parseInt(quantityInput.value);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                    // tr.setAttribute("data-quantite", quantiteInput.value);
                    quantityInput.dispatchEvent(new Event('input'));
                }
            }
        });
    });

    var supprimer = document.querySelectorAll('.supprimer');
    supprimer.forEach(function(button) {
        button.addEventListener('click', function() {
            let commandes = window.localStorage.getItem("commandes");
            commandes = JSON.parse(commandes);
            
                    // Récupérer le numéro de l'article à supprimer
                    var index = Array.from(supprimer).indexOf(button);
                    var articleASupprimer = commandes[index].idArticle;
            
                    // Ajouter la paire idCommande et idArticle à toDelete
                    var paireToDelete = {
                        idCommande: commandes[index].idCommande,
                        idArticle: articleASupprimer
                    };
                    toDelete.push(paireToDelete);
            
                    window.localStorage.setItem("toDelete", JSON.stringify(toDelete));

                    // Faire disparaître l'article de l'affichage
                    var article = button.parentElement.parentElement;
                    article.remove();
    
        });
    });


}

var toDelete = []; // Tableau pour stocker les paires idCommande et idArticle

const enregistrer = document.getElementById("enregistrer");
enregistrer.style.display = "none";
const annuler = document.getElementById("annuler");
annuler.style.display = "none";
const commander = document.getElementById("modif");
commander.addEventListener("click", async function () {
    modifierCommandes();
    commander.style.display = "none";
    enregistrer.style.display = "block";
    annuler.style.display = "block";
});
enregistrer.addEventListener("click", async function () {
    if (window.localStorage.getItem("toDelete")!=null) {
        deleteArt();
    }
    updateArt();
// Une fois que tous mes update et delete ont fontionnés
    const caseTete = document.querySelector(".thead");
    caseTete.innerHTML = "";
    const caseArticle = document.querySelector(".tbody");
    caseArticle.innerHTML = "";
    afficherCommandes();
    enregistrer.style.display = "none";
    annuler.style.display = "none";
    commander.style.display = "block";
    toDelete = [];
    aModifier = [];
    window.localStorage.removeItem("toDelete");
    window.localStorage.removeItem("aModifier");
});
annuler.addEventListener("click", async function () {
// Une fois que tous mes update et delete ont fontionnés
    const caseTete = document.querySelector(".thead");
    caseTete.innerHTML = "";
    const caseArticle = document.querySelector(".tbody");
    caseArticle.innerHTML = "";
    afficherCommandes();
    enregistrer.style.display = "none";
    annuler.style.display = "none";
    commander.style.display = "block";
    toDelete = [];
    aModifier = [];
    window.localStorage.removeItem("toDelete");
    window.localStorage.removeItem("aModifier");
});

function deleteArt() {
    let toDelete = window.localStorage.getItem("toDelete");
    toDelete = JSON.parse(toDelete);
    let cpt = 0;

    toDelete.forEach(async function(idC) {
        // Récupérer les données du formulaire
        const idCommande = toDelete[cpt].idCommande;
        const idArticle = toDelete[cpt].idArticle;
        cpt++;

        // Créer un objet contenant les données de l'utilisateur
        const commande = {
            idCommande,
            idArticle,
        };

        try {
            // Effectuer une requête DELETE vers le backend
            const response = await fetch('http://localhost:8000/commande/'+idCommande+'/'+idArticle, {
                method: 'DELETE',
                headers: {
                    'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commande)
            });
            
    // Vérifier la réponse du serveur
    if (response.ok) {
        const data = await response.json();
        console.log('Commande supprimée :', data);
        // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
        const affichageRep = document.querySelector(".commandes");
        const reponseDelete = document.createElement("h3");
        reponseDelete.innerText = 'Delete ok';
        affichageRep.appendChild(reponseDelete);
        // Attendre 3 secondes (3000 millisecondes)
        // setTimeout(function() {
        // // Rediriger l'utilisateur vers une autre page après 3 secondes
        //   window.location.href = "http://127.0.0.1:8080/index.html";
        // }, 3000);
        
      } else {
        const errorData = await response.json();
        // Une erreur s'est produite lors de la création de l'utilisateur
        console.log('Erreur lors du delete la commande: ', errorData.message);
        // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
        const affichageRep = document.querySelector(".commandes");
        const reponseDelete = document.createElement("h3");
        reponseDelete.innerText = 'Erreur lors du delete de la commande: ', errorData.message;
        affichageRep.appendChild(reponseDelete);
      }
      console.log(response);


        } catch (error) {
            // Une erreur s'est produite lors de la requête
            console.log('Erreur lors de la requête:', error.message);
            // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
            const affichageRep = document.querySelector(".commandes");
            const reponseDelete = document.createElement("h3");
            reponseDelete.innerText = 'Erreur lors de la requête:', error.message;
            affichageRep.appendChild(reponseDelete);
            // Attendre 3 secondes (3000 millisecondes)
            // setTimeout(function() {
            //     // Rediriger l'utilisateur vers une autre page après 3 secondes
            //     window.location.href = "http://127.0.0.1:8080/connexion.html";
            // }, 3000);
        }
    });
}

function updateArt() {

    // Récupérer la liste des articles restants
    let aModifier = [];

    const lignesCommande = document.querySelectorAll(".tbody tr");
    lignesCommande.forEach(function (ligne) {
        const idCommande = ligne.getAttribute("data-idCommande");
        const idArticle = ligne.getAttribute("data-idArticle");
        const quantite = ligne.getAttribute("data-quantite");
        const montant = ligne.getAttribute("data-montant");

        const articleModifie = {
            idCommande: idCommande,
            idArticle: idArticle,
            quantite: quantite,
            montant: montant
        };
        aModifier.push(articleModifie);
    });

    // Stocker la liste aModifier dans le localStorage
    window.localStorage.setItem("aModifier", JSON.stringify(aModifier));

    let articles = window.localStorage.getItem("articles");
    articles = JSON.parse(articles);

    let toUpdate = window.localStorage.getItem("aModifier");
    toUpdate = JSON.parse(toUpdate);
    let cpt = 0;
    console.log(toUpdate[cpt].quantite);

    toUpdate.forEach(async function(idC) {
        // Récupérer les données du formulaire
        const idCommande = toUpdate[cpt].idCommande;
        const idArticle = toUpdate[cpt].idArticle;

        console.log(toUpdate[cpt].quantite);
        const quantite = toUpdate[cpt].quantite;
        const montant = quantite*articles[idArticle-1].prix;
        console.log(montant);
        cpt++;
        // Créer un objet contenant les données de l'utilisateur
        const commande = {
            // idCommande,
            // idArticle,
            quantite,
            montant,
        };

        try {
            // Effectuer une requête DELETE vers le backend
            const response = await fetch('http://localhost:8000/commande/'+idCommande+'/'+idArticle, {
                method: 'PUT',
                headers: {
                    'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commande)
            });
            
    // Vérifier la réponse du serveur
    if (response.ok) {
        const data = await response.json();
        console.log('Commande modifié :', data);
        // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
        const affichageRep = document.querySelector(".commandes");
        const reponseUpdate = document.createElement("h3");
        reponseUpdate.innerText = 'Modification ok';
        affichageRep.appendChild(reponseUpdate);
        
      } else {
        const errorData = await response.json();
        // Une erreur s'est produite lors de la création de l'utilisateur
        console.log('Erreur lors de l\'update la commande: ', errorData.message);
        // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
        const affichageRep = document.querySelector(".commandes");
        const reponseUpdate = document.createElement("h3");
        reponseUpdate.innerText = 'Erreur lors de l\'update de la commande: ', errorData.message;
        affichageRep.appendChild(reponseUpdate);
      }
      console.log(response);


        } catch (error) {
            // Une erreur s'est produite lors de la requête
            console.log('Erreur lors de la requête:', error.message);
            // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
            const affichageRep = document.querySelector(".commandes");
            const reponseUpdate = document.createElement("h3");
            reponseUpdate.innerText = 'Erreur lors de la requête:', error.message;
            affichageRep.appendChild(reponseUpdate);
        }
    });
}