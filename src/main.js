import "./style.css";

const urlApi =
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=20";

const formaterDonnee = (arbre) => {
  return {
    id: arbre.com_idarbre,
    nom: arbre.arbres_libellefrancais,
    arrondissement: arbre.arbres_arrondissement,
    adresse: arbre.arbres_adresse,
    datePlantation: arbre.arbres_dateplantation,
    genre: arbre.arbres_genre,
    espece: arbre.arbres_espece,
    resume: arbre.com_resume,
    description: arbre.com_descriptif,
    photo: arbre.com_url_photo,
  };
};

async function chargerDonnees() {
  try {
    const response = await fetch(urlApi);
    const donnees = await response.json();

    console.log(donnees);
    console.log(donnees.results);

    const arbresFormates = donnees.results.map(formaterDonnee);

    console.log(arbresFormates);
  } catch (error) {
    console.error("Erreur pendant le chargement des données:", error);
  }
}

chargerDonnees();
