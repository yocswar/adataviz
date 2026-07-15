import "./style.css";
import {
  formaterDonnee,
  creerParagraphe,
  filterParArrondissement,
  filterParNom,
} from "./utils.js";

const urlApi =
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20";

const creerCarte = (arbre) => {
  const carte = document.createElement("article");
  carte.classList.add("carte");

  const titre = document.createElement("h3");
  titre.textContent = arbre.nom;

  const arrondissement = creerParagraphe(arbre.arrondissement);
  const genre = creerParagraphe(`Genre : ${arbre.genre}`);
  const espece = creerParagraphe(`Espèce : ${arbre.espece}`);
  const resume = creerParagraphe(arbre.resume || "Aucun résumé disponible.");

  carte.append(titre, arrondissement, genre, espece, resume);

  return carte;
};

const afficherTotalResultats = (nombre) => {
  const totalResultats = document.querySelector("#total-resultats");
  totalResultats.textContent = `${nombre} arbres trouvés`;
};

const afficherCartes = (arbres) => {
  const grilleCartes = document.querySelector("#grille-cartes");

  grilleCartes.innerHTML = "";

  arbres.forEach((arbre) => {
    const carte = creerCarte(arbre);
    grilleCartes.appendChild(carte);
  });
};

const remplirFiltreArrondissement = (arbres) => {
  const selectElement = document.querySelector("#filtre-arrondissement");

  const arrondissements = arbres.map((arbre) => arbre.arrondissement);

  const uniques = [...new Set(arrondissements)];
  uniques.sort();

  uniques.forEach((arrondissements) => {
    const option = document.createElement("option");
    option.value = arrondissements;
    option.textContent = arrondissements;

    selectElement.append(option);
  });
};

const mettreAJourResultats = (arbres) => {
  afficherTotalResultats(arbres.length);
  afficherCartes(arbres);
};

const appliquerFiltres = (arbres) => {
  const champRecherche = document.querySelector("#recherche-nom");
  const selectArrondissement = document.querySelector("#filtre-arrondissement");

  const recherche = champRecherche.value;
  const arrondissement = selectArrondissement.value;

  const arbresFiltresParNom = filtrerParNom(arbres, recherche);

  const arbresFiltres = filtrerParArrondissement(
    arbresFiltresParNom,
    arrondissement,
  );

  mettreAJourResultats(arbresFiltres);
};

const activerFiltres = (arbres) => {
  const champRecherche = document.querySelector("#recherche-nom");
  const selectArrondissement = document.querySelector("#filtre-arrondissement");

  champRecherche.addEventListener("input", () => {
    appliquerFiltres(arbres);
  });

  selectArrondissement.addEventListener("change", () => {
    appliquerFiltres(arbres);
  });
};

async function chargerDonnees() {
  try {
    const response = await fetch(urlApi);
    const donnees = await response.json();

    const arbresFormates = donnees.results.map(formaterDonnee);

    remplirFiltreArrondissement(arbresFormates);
    activerFiltres(arbresFormates);
    mettreAJourResultats(arbresFormates);

    console.log("Données brutes :", donnees);
    console.log("Données formatées :", arbresFormates);
  } catch (error) {
    console.error("Erreur pendant le chargement des données:", error);
  }
}
chargerDonnees();
