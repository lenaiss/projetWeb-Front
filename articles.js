// Récupération des articles éventuellement stockées dans le localStorage
let articles = window.localStorage.getItem("articles");
if (articles === null) {
    // Récupération des pièces depuis l'API HTTP'
    const reponse = await fetch("http://localhost:8000/article/", {
        headers: {
            'Acces-Control-Allow-Origin': 'http://127.0.0.1:8080/', //autoriser le domaine d'origine
        }
    });
    // Récupération des pièces depuis le fichier JSON
    // const reponse = await fetch('articles.json');
    let articles = await reponse.json();
    console.log(articles);
    console.log(articles.length);
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(articles);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("articles", valeurPieces);    
}
else {
    articles = JSON.parse(articles);
}

// Récupération des artistes éventuellement stockées dans le localStorage
let artistes = window.localStorage.getItem("artistes");
if (artistes === null) {
    // Récupération des pièces depuis l'API HTTP'
    const reponse = await fetch("http://localhost:8000/artiste/");
    // Récupération des pièces depuis le fichier JSON
    // const reponse = await fetch('artistes.json');
    let artistes = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(artistes);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("artistes", valeurPieces);    
}
else {
    artistes = JSON.parse(artistes);
}


function genererPieces(articles) {
    for (let i = 0; i < articles.length; i++) {

        const article = articles[i];
        // const pageProduit = "./produit?id="+articles[i].id

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("button");
        pieceElement.classList.add('card');
        pieceElement.addEventListener('click', () => {
            // Remplacer l'URL actuelle avec la nouvelle page
            // pageArticle(articles[i].id);
            localStorage.setItem("idArticleSelectionne", articles[i].idArticle);
            window.location.replace('./produit.html');
            pageArticle();
        });
                // On rattache la balise article à la section Fiches
                sectionFiches.appendChild(pieceElement);

        // On crée l’élément img.
        const imageElement = document.createElement("img");
        imageElement.classList.add('card-img');
                // On rattache l’image à pieceElement (la balise article)
                pieceElement.appendChild(imageElement);
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = articles[i].image;

        const infoElement = document.createElement("div");
        infoElement.classList.add('card-info')
                        // On rattache les infos à pieceElement (la balise article)
                        pieceElement.appendChild(infoElement);

        const nomElement = document.createElement("p");
        nomElement.classList.add('text-title')
        nomElement.innerText = article.nomArticle;
            infoElement.appendChild(nomElement);

        // const descriptionElement = document.createElement("p");
        // descriptionElement.classList.add('text-body')
        // descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        //     infoElement.appendChild(descriptionElement);

        const footerElement = document.createElement("div");
        footerElement.classList.add('card-footer')
                        // On rattache le footer à pieceElement (la balise article)
                        pieceElement.appendChild(footerElement);
        
        const prixElement = document.createElement("span");
        prixElement.classList.add('text-title');
        prixElement.innerText = `Prix: ${article.prix} €`;
        // prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
            footerElement.appendChild(prixElement);

        const panierElement = document.createElement("button");
        panierElement.classList.add('card-button');
            footerElement.appendChild(panierElement);

        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.classList.add('svg-icon');
        svgIcon.setAttribute('viewBox', '0 0 20 20');
            panierElement.appendChild(svgIcon);
        
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z');
            svgIcon.appendChild(path1);
            
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z');
            svgIcon.appendChild(path2);
            
        const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path3.setAttribute('d', 'M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z');
            svgIcon.appendChild(path3);
        
    }
    // Ajout de la fonction ajoutListenersAvis
    //ajoutListenersAvis();    
}

// Premier affichage de la page
genererPieces(articles);


// Récupérer tous les boutons de fiche
// const boutonsFiche = document.querySelectorAll('.card');

// // Ajouter une fonction d'événement à chaque bouton de fiche
// boutonsFiche.forEach(bouton => {
//   bouton.addEventListener('click', () => {
//     // Remplacer l'URL actuelle avec la nouvelle page
//     window.location.replace('./produit.html');
//   });
// });

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    // window.location.replace('./index.html');
    const piecesOrdonnees = Array.from(articles);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Tous les articles";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// const boutonFiltrer = document.querySelector(".btn-filtrer");
// boutonFiltrer.addEventListener("click", function () {
//     const piecesFiltrees = articles.filter(function (article) {
//         return article.prix <= 35;
//     });
//     // Effacement de l'écran et regénération de la page
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees);
// });


const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(articles);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Tous les articles";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// const boutonNoDescription = document.querySelector(".btn-nodesc");
// boutonNoDescription.addEventListener("click", function () {
//     const piecesFiltrees = articles.filter(function (article) {
//         return article.description;
//     });
//     // Effacement de l'écran et regénération de la page
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees);
// });

const noms = articles.map(article => article.nom);
for (let i = articles.length - 1; i >= 0; i--) {
    if (articles[i].prix > 35) {
        noms.splice(i, 1);
    }
}

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
// document.querySelector('.abordables').appendChild(abordablesElements);


const infos = articles.map(article => article.nom + " – " + article.prix + " €");
for (let i = articles.length - 1; i >= 0; i--) {
    if (!articles[i].disponibilite) {
        infos.splice(i, 1);
    }
}

const diponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const infoElement = document.createElement('li');
    infoElement.innerText = infos[i];
    diponiblesElements.appendChild(infoElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
// document.querySelector('.disponibles').appendChild(diponiblesElements);


const inputPrixMax = document.querySelector('#prix-max');
inputPrixMax.addEventListener('input', function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.prix <= inputPrixMax.value;
    });
    document.querySelector(".filtres label").innerHTML = "Max : "+inputPrixMax.value;
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Ajout du listener pour mettre à jour des données du localStorage
// const boutonMettreAJour = document.querySelector(".btn-maj");
// boutonMettreAJour.addEventListener("click", function () {
//   window.localStorage.removeItem("articles");
// });





/*CODE DE MOI AIE AIE AIE*/
const filtrerEnStock = document.querySelector(".btn-stock");
filtrerEnStock.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.disponibilite == "true";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Articles en stock";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerGroupes = document.querySelector(".btn-groupes");
filtrerGroupes.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].categorie == "Groupe";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Groupes";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerSolos = document.querySelector(".btn-solos");
filtrerSolos.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        console.log(artistes[id-1].categorie);
        return artistes[id-1].categorie == "Solo";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Solos";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


const filtrerBoysband = document.querySelector(".btn-boysband");
filtrerBoysband.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Boysband";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Boysbands";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerGirlsband = document.querySelector(".btn-girlsband");
filtrerGirlsband.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Girlsband";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Girlsbands";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerMixte = document.querySelector(".btn-mixte");
filtrerMixte.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Mixte";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Groupes mixte";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerFille = document.querySelector(".btn-fille");
filtrerFille.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Fille";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Filles solos";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerGarcon = document.querySelector(".btn-garcon");
filtrerGarcon.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Garçon";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Garçons solos";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerAlbums = document.querySelector(".btn-albums");
filtrerAlbums.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.typeArticle == 2;
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Albums";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


const filtrerLightstick = document.querySelector(".btn-lightsticks");
filtrerLightstick.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        // console.log(article.typeArticle);
        return article.typeArticle == 1;
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Lightsticks";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerSeasonsGreet = document.querySelector(".btn-seasons-greet");
filtrerSeasonsGreet.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.typeArticle == 3;
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Season's Greetings";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});




// TEST TEST TEST




// const filtrerGroupes = document.querySelector(".btn-groupes");
// filtrerGroupes.addEventListener("click", function () {
//     // localStorage.setItem("filtreSelectionne", "Groupe");
//     // let filtreSelectionne = localStorage.getItem("filtreSelectionne");
//     fitrageGroupe();
// });

// function fitrageGroupe() {
//     const piecesFiltrees = articles.filter(function (article) {
//         let id = article.idArtiste;
//         return artistes[id-1].categorie == "Groupe";
//     });
//     console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
//     // Effacement de l'écran et regénération de la page
//     document.querySelector(".filtres label").innerHTML = "De 0 à 90";
//     document.querySelector(".titre h1").innerHTML = "Groupes";
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees);
// }






// document.querySelector(".btn-groupes").addEventListener("click", function () {
//     sessionStorage.setItem("executeFunction", "true");
//     window.location.href = "index.html";
// });
// const filtrerGroupes = document.querySelector(".btn-groupes");
// filtrerGroupes.addEventListener("click", function () {
//     if (sessionStorage.getItem("executeFunction") === "true") {
//       const piecesFiltrees = articles.filter(function (article) {
//         let id = article.idArtiste;
//         return artistes[id-1].categorie == "Groupe";
//       });
//       console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
//       // Effacement de l'écran et regénération de la page
//       document.querySelector(".filtres label").innerHTML = "De 0 à 90";
//       document.querySelector(".titre h1").innerHTML = "Groupes";
//       document.querySelector(".fiches").innerHTML = "";
//       genererPieces(piecesFiltrees);
  
//       // Réinitialiser la valeur de la clé "executeFunction" à "false" pour éviter que la fonction ne soit exécutée à nouveau lors du chargement de la page suivante
//       sessionStorage.setItem("executeFunction", "false");
//     }
// });