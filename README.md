# Système de Gestion Scolaire

Un système modulaire de gestion scolaire développé en TypeScript avec IndexedDB.

## 🚀 Installation

1. Cloner le repository
```bash
git clone [url-du-repo]
cd gestion-scolaire
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le projet en mode développement
```bash
npm run dev
```

## 🏗️ Architecture

Le projet suit une architecture modulaire basée sur les design patterns suivants :

### Design Patterns Utilisés

1. **Singleton Pattern**
   - Implémenté dans `ResourceManager` et `Database`
   - Assure une instance unique pour la gestion des ressources et la base de données

2. **Factory Pattern**
   - Implémenté dans `CourseFactory`
   - Permet la création flexible de différents types de cours

3. **Decorator Pattern**
   - Implémenté dans `ServiceDecorator`
   - Permet d'ajouter dynamiquement des services aux élèves

### Structure des Dossiers

```
src/
├── database/         # Gestion de la base de données IndexedDB
├── interfaces/       # Définitions des interfaces
├── managers/         # Gestionnaires (ResourceManager, etc.)
├── factories/        # Factories pour la création d'objets
├── decorators/       # Decorators pour les services
└── models/          # Classes de base
```

### Base de Données

Le projet utilise IndexedDB avec les stores suivants :
- eleves
- enseignants
- cours
- ressources
- services

## 📝 Fonctionnalités

1. **Gestion des Élèves**
   - Inscription
   - Association aux cours
   - Ajout de services supplémentaires

2. **Gestion des Cours**
   - Création via Factory
   - Association aux enseignants
   - Différents types (Math, Histoire, Science)

3. **Gestion des Ressources**
   - Système de réservation
   - Suivi de disponibilité
   - Types variés (salles, matériel, fournitures)

4. **Services Supplémentaires**
   - Tutorat
   - Sport
   - Art

## 🔧 Technologies

- TypeScript
- IndexedDB
- Design Patterns
- Programmation Orientée Objet

## 🧪 Tests

Pour lancer les tests :
```bash
npm test
```

## 📚 Documentation

La documentation complète du code est disponible dans les fichiers source.
Chaque classe et méthode importante est documentée avec des commentaires JSDoc. 