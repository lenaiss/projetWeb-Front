let panier = window.localStorage.getItem("panier");

if (panier==null) {
    const vide = document.querySelector(".panier");
    vide.innerHTML = "";
    const msgVide = document.createElement("h3");
    msgVide.innerText = "Aucun article dans votre panier"
    vide.appendChild(msgVide);
}
else {
    afficherPanier();
}

function afficherPanier() {
    let articles = window.localStorage.getItem("articles");
    articles = JSON.parse(articles);
    var idArticles = panier.split(",").map(function(item) {
        return parseInt(item, 10);
    });
    let total = 0; // Variable pour stocker le montant total
    idArticles.forEach(function(id) {
        // Faites quelque chose avec chaque chiffre
        console.log(id);
        const caseArticle = document.querySelector("tbody");
        const tr = document.createElement("tr");
        const preview = document.createElement("td");
        const nom = document.createElement("td");
        const qt = document.createElement("td");
        qt.classList.add('quantity-container');
        const divQt = document.createElement("div");
        divQt.classList.add('quantity-controls');
        const prix = document.createElement("td");
        const image = document.createElement("img");
        image.src = articles[id-1].image;
        nom.innerText = articles[id-1].nomArticle;
        const majQt = document.createElement("input");
        majQt.setAttribute("type", "number");
        majQt.setAttribute("value", "1");
        majQt.setAttribute("min", "1");
        majQt.classList.add('quantity-input');
        majQt.setAttribute("id", "quantity-input-"+id);
        const plus = document.createElement("button");
        plus.classList.add('quantity-increment');
        plus.innerText = "+";
        plus.setAttribute("data-target", "quantity-input-"+id);
        const moins = document.createElement("button");
        moins.classList.add('quantity-decrement');
        moins.innerText = "-";
        plus.setAttribute("data-target", "quantity-input-"+id);
        qt.appendChild(divQt);
        divQt.appendChild(moins);
        divQt.appendChild(majQt);
        divQt.appendChild(plus);
        const supprimer = document.createElement("img");
        supprimer.classList.add('supprimer');
        qt.appendChild(supprimer);
        supprimer.src = "images/poubelle.png";
        prix.innerText = articles[id-1].prix+"€";
        prix.classList.add("prix");
        preview.appendChild(image);
        tr.appendChild(preview);
        tr.appendChild(nom);
        tr.appendChild(qt);
        tr.appendChild(prix);
        caseArticle.appendChild(tr);

        const quantiteInput = document.getElementById("quantity-input-"+id);
        const prixArticle = articles[id-1].prix;
        // total = total + quantiteInput.value*prixArticle;
        let valuePrev = quantiteInput.value;

        // Fonction pour mettre à jour le montant total
        const updateTotal = function() {
            let montantArticle = valuePrev * prixArticle;
            total = total - montantArticle; // Soustraire l'ancien montant
            montantArticle = quantiteInput.value * prixArticle;
            total = total + montantArticle; // Ajouter le nouveau montant
            valuePrev = quantiteInput.value; //on enregistre la nouvelle quantité
            prix.innerText = montantArticle+"€";
            const prixTotal = document.querySelector(".total-prix");
            prixTotal.innerText = "Total : "+total+"€";
        };

        // Gestionnaires d'événements pour la modification de la quantité
        quantiteInput.addEventListener("change", updateTotal);
        quantiteInput.addEventListener("input", updateTotal);

        // Calculer le montant initial de chaque article
        let montantArticlePrev = quantiteInput.value * prixArticle;
        total = total + montantArticlePrev; // Ajouter le montant à total
    });

    const prixTotal = document.querySelector(".total-prix");
    prixTotal.innerText = "Total : "+total+"€";
}


var quantityInputs = document.querySelectorAll('.quantity-input');
var quantityIncrements = document.querySelectorAll('.quantity-increment');
var quantityDecrements = document.querySelectorAll('.quantity-decrement');

quantityIncrements.forEach(function(button) {
    button.addEventListener('click', function() {
        var quantityInput = button.parentElement.querySelector('.quantity-input');
        var quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
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
                quantityInput.dispatchEvent(new Event('input'));
            }
        }
    });
});

var supprimer = document.querySelectorAll('.supprimer');
supprimer.forEach(function(button) {
    button.addEventListener('click', function() {
        // var idToDelte = button.parentElement.querySelector('.quantity-input');
        // if (quantityInput) {
        let panier = window.localStorage.getItem("panier");
        var articlesPanier = panier.split(",").map(function(item) {
            return parseInt(item, 10);
        });
        // Récupérer le numéro de l'article à supprimer
        var index = Array.from(supprimer).indexOf(button);
        var articleASupprimer = articlesPanier[index];

        // Supprimer l'article du tableau
        articlesPanier.splice(index, 1);
        localStorage.removeItem('panier');
        // Mettre à jour la liste des articles dans le localStorage
        if (articlesPanier.length>0) {
            panier = articlesPanier.join(",");
            window.localStorage.setItem("panier", panier);
        }

        console.log("Article supprimé :", articleASupprimer);
        // Temporisation avant de réafficher le panier
        // document.querySelector(".tbody").innerHTML = "";
        // setTimeout(function() {
        //     panier = window.localStorage.getItem("panier");
        //     afficherPanier();
        // }, 1000);

                // Recharger automatiquement la page
                location.reload();
    });
});







const commander = document.querySelector(".fancy");
commander.addEventListener("click", async function () {

    let articles = window.localStorage.getItem("articles");
    articles = JSON.parse(articles);

    // Récupérer les articles du panier
    let panier = window.localStorage.getItem("panier");
    var articlesPanier = panier.split(",").map(function(item) {
        return parseInt(item, 10);
    });

    //Fixer le numéro de la commande
    const response = await fetch("http://localhost:8000/commande/newID", {
        headers: {
            'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
        }
    });
    let id = await response.json();
    const idCommande = id[0].newId;

    articlesPanier.forEach(async function(idArticle) {

        // Récupérer la quantité de chaque article
        const quantiteInput = document.getElementById("quantity-input-" + idArticle);
        const quantite = parseInt(quantiteInput.value, 10);
        const montant = articles[idArticle-1].prix*quantite;

        // Créer un objet contenant les données de la commande
        let commande = {
            idCommande,
            idArticle,
            quantite,
            montant
        };
        console.log(commande); 
        commande = JSON.stringify(commande);
        console.log(commande);

        try {
        // Effectuer une requête POST vers le backend
        console.log(commande);
            const response = await fetch('http://localhost:8000/commande/commander', {
            method: 'POST',
            headers: {
                'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(commande)
            body: commande
            });
            console.log(commande);
            // Vérifier la réponse du serveur
            if (response.ok) {
                const data = await response.json();

                // Utilisateur connecté avec succès
                console.log('Commande envoyée :', data);
                // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
                const affichageRep = document.querySelector(".panier");
                const reponseConnexion = document.createElement("h3");
                reponseConnexion.innerText = "Article commandé avec succès";
                affichageRep.appendChild(reponseConnexion);
                localStorage.removeItem('panier');
                  // Attendre 3 secondes (3000 millisecondes)
                  setTimeout(function() {
                  // Rediriger l'utilisateur vers une autre page après 3 secondes
                    window.location.href = "http://127.0.0.1:8080/index.html";
                  }, 3000);
      
            } else {
                const errorData = await response.json();
                // Une erreur s'est produite lors du passage de la commande
                console.log('Erreur lors du passage de la commande:', errorData.message);
                // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
                const affichageRep = document.querySelector(".panier");
                const reponseConnexion = document.createElement("h3");
                reponseConnexion.innerText = 'Erreur lors du passage de la commande:', errorData.message;
                affichageRep.appendChild(reponseConnexion);
            //   // Attendre 3 secondes (3000 millisecondes)
            //   setTimeout(function() {
            //   // Rediriger l'utilisateur vers une autre page après 3 secondes
            //     window.location.href = "http://127.0.0.1:8080/connexion.html";
            //   }, 3000);
            }
            console.log(response);
        } catch (error) {
            // Une erreur s'est produite lors de la requête
            console.log('Erreur lors de la requête:', error.message);
            // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
            const affichageRep = document.querySelector(".panier");
            const reponseConnexion = document.createElement("h3");
            reponseConnexion.innerText = 'Erreur lors de la requête:', error.message;
            affichageRep.appendChild(reponseConnexion);
            // // Attendre 3 secondes (3000 millisecondes)
            // setTimeout(function() {
            // // Rediriger l'utilisateur vers une autre page après 3 secondes
            //   window.location.href = "http://127.0.0.1:8080/connexion.html";
            // }, 3000);
        }

    })

});