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


let idArticle = localStorage.getItem("idArticleSelectionne");


function afficherProduit() {
    let articleSelectionne = articles[idArticle-1]
    if (articleSelectionne) {
        document.querySelector(".titre h1").innerHTML = articleSelectionne.nomArticle;

                // Récupération de l'élément du DOM qui accueillera les fiches
                const sectionPresentation = document.querySelector(".presentation");
                
                // Création d’une balise dédiée à une pièce automobile
                const detailProduit = document.createElement("div");
                detailProduit.classList.add('text');
                // On rattache la balise article à la section Fiches
                sectionPresentation.appendChild(detailProduit);
        
                const artisteProduit = document.createElement("h2");
                artisteProduit.classList.add('artiste')
                artisteProduit.innerText = "Artiste : "+artistes[articleSelectionne.idArtiste-1].nomArtiste;
                detailProduit.appendChild(artisteProduit);

                const descriptionProduit = document.createElement("h3");
                descriptionProduit.classList.add('desc')
                descriptionProduit.innerText = "Description : "+articleSelectionne.description ?? "Pas de description pour le moment.";
                detailProduit.appendChild(descriptionProduit);

                const dateSortieProduit = document.createElement("h2");
                dateSortieProduit.classList.add('dateSortie')
                dateSortieProduit.innerText = "Date sortie : "+articleSelectionne.dateSortie;
                detailProduit.appendChild(dateSortieProduit);

                const dimensionsProduit = document.createElement("h3");
                dimensionsProduit.classList.add('dim')
                dimensionsProduit.innerText = "Dimensions : "+articleSelectionne.dimension;
                detailProduit.appendChild(dimensionsProduit);

                const footerElement = document.createElement("div");
                footerElement.classList.add('card-footer')
                                // On rattache le footer à pieceElement (la balise article)
                                detailProduit.appendChild(footerElement);

                const prixElement = document.createElement("span");
                prixElement.classList.add('text-title');
                prixElement.innerText = `Prix: ${articleSelectionne.prix} €`;
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


                const imageProduit = document.createElement("div");
                imageProduit.classList.add('image');
                        // On rattache la balise article à la section Fiches
                        sectionPresentation.appendChild(imageProduit);

                // On crée l’élément img.
                const imageElement = document.createElement("img");
                // imageElement.classList.add('image');
                        // On rattache l’image à pieceElement (la balise article)
                        imageProduit.appendChild(imageElement);
                // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
                imageElement.src = articleSelectionne.image;
            

        // Afficher les autres informations de l'article sur la page
    } else {
      console.error(`L'article avec l'ID ${idArticle} n'a pas été trouvé.`);
    }
}
  
afficherProduit();

// window.localStorage.setItem("panier");

const addToCart = document.querySelector(".card-button");
addToCart.addEventListener("click", function () {
    let panier = window.localStorage.getItem("panier");
    if (panier==null) {
        window.localStorage.setItem("panier", idArticle);
    }
    else {
        panier = panier +','+idArticle;
        window.localStorage.setItem("panier", panier);
    }
});




















// const filtrerGroupes = document.querySelector(".btn-groupes");
// filtrerGroupes.addEventListener("click", function () {
//     // localStorage.setItem("filtreSelectionne", artistes[articles[0].idArtiste].categorie);
//     window.location.replace('./index.html');
//     filtrerGroupes.click();
// });









// let idArticle;
// export function pageArticle(id) {
//     idArticle = articles[id].id;
// }

// function misaAJourPage(id) {
//     console.log(articles[id].id);
//     console.log(articles[id].artiste);
//     console.log(articles[id-1].id);
//     console.log(articles[id-1].artiste);
//     // const articleSelectionne = articles[id-1]
//     document.querySelector(".titre h1").innerHTML = articles[id].nom;
// }

// function misaAJourPage(id) {
//     if (articles.hasOwnProperty(id)) {
//       console.log(articles[id].id);
//       console.log(articles[id].artiste);
//       console.log(articles[id-1].id);
//       console.log(articles[id-1].artiste);
//       document.querySelector(".titre h1").innerHTML = articles[id].nom;
//     } else {
//       console.error(`L'indice ${id} n'existe pas dans le tableau 'articles'.`);
//     }
//   }

// misaAJourPage(idArticle);




// const filtrerProduit = document.querySelector(".btn-groupes");
// filtrerProduit.addEventListener("click", function () {
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
// });