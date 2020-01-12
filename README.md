# Description de l'application
Cette application se compose d'un serveur front s'exécutant sur Angular 6 ainsi que d'un serveur principal Spring Boot. Le serveur sert les données dans un fichier `movies.json` placé dans le même répertoire que lui via une API REST exposée dans` localhost: 8080 / movies`. Le front-end affiche les données disponibles dans une grille de cartes réactive et permet de créer, éditer et supprimer des données. On peut également trier les données selon ses différents champs, et rechercher des données spécifiques.

## Installation

1. Dans le sous-dossier `client`, exécutez` npm install` pour installer les dépendances nécessaires.
2. Le serveur principal a été précompilé et peut être exécuté en allant dans le répertoire `server / target` et en exécutant` java -jar movielibrary-0.1.0.jar`. Si vous souhaitez le compiler après les modifications, exécutez `mvn package -f" ./pom.xml "` dans le répertoire `server`. Java 8 et supérieur sont requis pour cela.
3. Démarrez le serveur frontal en allant dans le répertoire `client` et en exécutant` ng serve`.
4. Accédez à «http: // localhost: 4200» pour afficher l'application.
