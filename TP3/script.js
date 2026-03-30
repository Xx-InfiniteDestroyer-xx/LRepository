const projets = [
  { id: 1, titre: "Portfolio", description: "Mon site personnel responsive.", tags: ["HTML", "CSS"] },
  { id: 2, titre: "Blog tech", description: "Articles sur le développement web.", tags: ["JS", "API"] },
  { id: 3, titre: "App météo", description: "Application de météo en temps réel.", tags: ["JS", "API"] },
  { id: 4, titre: "Refonte asso", description: "Nouveau site pour une association.", tags: ["HTML", "CSS", "Figma"] },
  { id: 5, titre: "Mini-jeu", description: "Jeu de mémoire en JavaScript.", tags: ["JS", "DOM"] },
];


 /* ================================
       EXERCICE 1
       ================================ */


const conteneur = document.querySelector('#projets-liste');

function afficherProjets(listeProjets) {
  conteneur.innerHTML = ''; // Vider le conteneur

  listeProjets.forEach((projet) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');

    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <div class="tags">
        ${projet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    `; // Cela prend les informations entrées dans la section Ajouter un projet, et les utilise pour créer un nouveau projet

    conteneur.append(carte);
  });
}

// Afficher les projets
afficherProjets(projets);


 /* ================================
       EXERCICE 2
       ================================ */


const boutonsFiltres = document.querySelectorAll('.filtre');

boutonsFiltres.forEach((btn) => {
  btn.addEventListener('click', () => {
    // 1. Mettre à jour le bouton actif
    document.querySelector('.filtre.active').classList.remove('active');
    btn.classList.add('active');

    // 2. Filtrer les données
    const tag = btn.dataset.tag;
    if (tag === 'tous') {     
      afficherProjets(projets);   // Si on est dans la section "Tous", cela affiche tous les projets
    } else {
      const projetsFiltres = projets.filter(p => p.tags.includes(tag));
      afficherProjets(projetsFiltres); // Si on est dans une autre section, cela affiche uniquement les projets correspondants
    }
  });
});


 /* ================================
       EXERCICE 3
       ================================ */


const form = document.querySelector('#form-ajout');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  const titre = document.querySelector('#input-titre').value.trim();
  const description = document.querySelector('#input-desc').value.trim();
  const tagsTexte = document.querySelector('#input-tags').value.trim();

  if (!titre || !description) return; // Si le titre et/ou la description est vide, cela empêche d'ajouter un projet

  const nouveauProjet = {
    id: projets.length + 1, //prend un projet et ajoute +1 à la variable, pour distinguer chaque projet (le dernier projet a pour id:5, donc si on ajoute un projet, elle aura pour id:6)
    titre: titre,
    description: description,
    tags: tagsTexte ? tagsTexte.split(',').map(t => t.trim()) : [],
  };

  projets.push(nouveauProjet);
  afficherProjets(projets);
  form.reset(); // Vider le formulaire
  sauvegarder(); // Appelle la fonction sauvegarder
});


 /* ================================
       EXERCICE 4
       ================================ */


function sauvegarder() {
  localStorage.setItem('projets', JSON.stringify(projets));
}
  
function charger() {
  const donnees = localStorage.getItem('projets');
  if (donnees) {
    // Remplacer le contenu du tableau (sans réassigner la variable)
    projets.length = 0;
    JSON.parse(donnees).forEach(p => projets.push(p));
  }
}

// Au chargement de la page
charger();
afficherProjets(projets);
