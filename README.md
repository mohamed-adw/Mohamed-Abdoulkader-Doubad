# Système de Gestion Scolaire

Un système flexible de gestion scolaire conçu en TypeScript avec IndexedDB, permettant une gestion complète des étudiants, enseignants, cours, ressources et services.

## 🚀 Guide d'Installation

1. Cloner le projet
```bash
git clone [url-du-repo]
cd gestion-scolaire


2 . Installer les dépendances nécessaires

npm install

3 . Démarrer le serveur en mode développement

npm run start

Ce projet est organisé de manière modulaire pour favoriser la réutilisation et la flexibilité, en appliquant plusieurs modèles de conception.

Principaux Modèles de Conception
Singleton Pattern

Implémenté dans ResourceManager et Database pour garantir qu'une seule instance de gestion des ressources et de la base de données existe dans l'application.

Factory Pattern

Implémenté dans CourseFactory pour permettre la création d'instances de cours de manière flexible, en fonction des besoins.

Decorator Pattern

Utilisé dans ServiceDecorator pour ajouter dynamiquement des services à un étudiant, comme le tutorat ou l'activité physique.

Organisation des Dossiers

src/
├── database/         # Gestion des données avec IndexedDB
├── interfaces/       # Définitions des types et interfaces
├── managers/         # Gestion des ressources et base de données
├── factories/        # Création d'objets via des factories
├── decorators/       # Ajout dynamique de fonctionnalités via des decorators
└── models/           # Modèles de base représentant les entités


Base de Données
Ce système utilise IndexedDB pour stocker et gérer les données suivantes :

Élèves : Informations sur les étudiants

Enseignants : Détails des enseignants

Cours : Cours disponibles dans le système

Ressources : Ressources matérielles (salles, équipements, etc.)

Services : Services proposés (tutorat, sport, art)



Fonctionnalités
Gestion des Élèves

Inscription, suivi des cours et ajout de services personnalisés.

Gestion des Cours

Création dynamique des cours via la factory et attribution aux enseignants.

Gestion des Ressources

Réservation et gestion des disponibilités des ressources.

Services Extra

Ajout de services tels que le tutorat, les sports et les activités artistiques.




Technologies Utilisées
TypeScript

IndexedDB

Design Patterns (Singleton, Factory, Decorator)

Programmation Orientée Objet





Exécution des Tests
Pour exécuter les tests unitaires et valider le bon fonctionnement du projet, utilisez la commande suivante :

npm test



