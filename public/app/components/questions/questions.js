"use strict"

angular.module("wildNoteApp")

   .component("questions", {
      templateUrl: "/app/components/questions/questions.html",
      controller: Questions
   })

function Questions() {
   let questions = `a) Pourquoi utiliser $resource dans angular plutôt que $http ?
b) C'est quoi la différence entre front-end et back-end en fait ?
c) Pourquoi je peux pas utiliser document.getElementById dans NodeJS ?
d) Pourquoi c'est très grave d'utiliser document.getElementById dans AngularJS ?
e) C'est quoi la différence entre NodeJS et Javascript ?
f) En quoi c'est utile d'utiliser npm ?
g) A quoi ça sert une base de donnée ? Et mongoDB ?
h) Est-il possible de faire des relations entre plusieurs collections ? Est-ce une bonne pratique ?
i) C'est quoi un document dans mongoDB ? et une collection au final ?
j) Quelle serai la requête qui me permettrai d'aller chercher dans ma db "toto" dans la collection "tata" l'utilisateur ayant pour nom "titi" ?
k) Est-il plus important de sécuriser le client ou le serveur ? Pourquoi ?
l) Pourquoi [1, 2, 3, () => "boom"][Number(true) + 2]() === "boom" ? Expliquez le plus précisément possible.
m) Cite 3 directives angularjs.`;

   questions = questions.split("\n").map((q) => {
      return q.substr(3, q.length);;
   });

   let responses = [
      "$resource simplifie la tache en embarquant déja des fonctionnalités qu'on devrait coder nous meme avec $http",
      "Le front-end c'est la partie visible de l'application pour l'utilisateur (le client de l'application), le back end c'est tout le systéme invisible a l'utilisateur qui est mis en place afin de permettre au front-end de fonctionner",
      "Document représente le DOM, hors NodeJS n'a pas de DOM car il ne s'éxécute pas dans le navigateur",
      "Car ce n'est pas en accord avec la façon de développer AngularJS",
      "NodeJS est du Javascript exécuté en dehors du navigateur, sur la machine et donc avec possibilité de modifiations systéme",
      "Node Package Manager est un outil génial qui permet de facilement gérer, télécharger et scale des modules nécessaires a notre application",
      "Une base de donnée sert a stocker des données de maniére propre, efficace et rapide. Elle permet notamment de gérer un grand nombre données avec facilité. MongoDB est une BDD noSQL (bdd de collections) qui remplit parfaitement ce role en NodeJS vu que le JSON est très courant",
      "Oui c'est possible et ça peut être utile, cependant c'est une assez mauvaise pratique car les BDD relationelles sont bien plus optimisées pour cela et on y perds l'intêret du NoSQL",
      "Un document mongoDB est un gros JSON contenant la donnée, une collection est un ensemble de documents",
      "toto.tata.find( { name: 'titi' } )",
      "Le serveur est la priorité en terme de sécurité car il est la plaque tournante de l'application, si il tombe tout tombe, tandis que le client peut crasher/laisser passer des erreurs sans impacter quiquonque a part l'utilisateur en question",
      "Au premier tableau l'index 3 on retrouve une fonction fléchée qui returne le string 'boom', Number(arg) essaie de convertir arg en nombre peu importe son type, en l'occurence ici true vaut 1, 1+2 = 3 = 'boom'",
      "ng-bind, ng-model, ng-repeat"
   ]

   this.quizz = [];
   for (let i = 0; i < questions.length; i++) {
      this.quizz.push({question: questions[i], response: responses[i]})
   }
}
