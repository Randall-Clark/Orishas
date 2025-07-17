import React from 'react';
import '../styles/BecomeAuthor.css';

export default function BecomeAuthor() {
  const handleAccept = () => {
    // Appel API : upgrade user → auteur
    alert('Vous êtes maintenant auteur !');
  };

  return (
    <div className="become-author">
      <h2>Devenir Auteur</h2>
      <p>Avant d'accéder au Studio, veuillez lire et accepter les conditions suivantes :</p>
      <ul>
        <li>Vous êtes responsable du contenu publié.</li>
        <li>Aucune publication plagiée n’est autorisée.</li>
        <li>Le respect de la communauté est requis.</li>
      </ul>
      <button onClick={handleAccept}>J'accepte les conditions</button>
    </div>
  );
}