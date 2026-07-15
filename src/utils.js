export const formaterDonnee = (arbre) => {
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

export const creerParagraphe = (texte) => {
  const paragraphe = document.createElement("p");
  paragraphe.textContent = texte;

  return paragraphe;
};

export const filtrerParArrondissement = (arbres, arrondissement) => {
  if (arrondissement === "") {
    return arbres;
  }

  return arbres.filter((arbre) => arbre.arrondissement === arrondissement);
};

export const filtrerParNom = (arbres, recherche) => {
  const rechercheNormalisee = recherche.trim().toLowerCase();

  if (rechercheNormalisee === "") {
    return arbres;
  }

  return arbres.filter((arbre) => {
    return arbre.nom.toLowerCase().includes(rechercheNormalisee);
  });
};
