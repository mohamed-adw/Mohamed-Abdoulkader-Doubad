import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface GestionScolaireDB extends DBSchema {
  eleves: {
    key: number;
    value: any;
    indexes: { 'by-matricule': string };
  };
  enseignants: {
    key: number;
    value: any;
    indexes: { 'by-nom': string };
  };
  cours: {
    key: number;
    value: any;
    indexes: { 'by-type': string };
  };
  ressources: {
    key: number;
    value: any;
    indexes: { 'by-type': string };
  };
  services: {
    key: number;
    value: any;
    indexes: { 'by-type': string };
  };
}

export class Database {
  private static instance: Database;
  private db: IDBPDatabase<GestionScolaireDB> | null = null;
  private readonly DB_NAME = 'GestionScolaireDB';
  private readonly VERSION = 1;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    if (this.db) return;

    this.db = await openDB<GestionScolaireDB>(this.DB_NAME, this.VERSION, {
      upgrade(db) {
        // Création des object stores
        if (!db.objectStoreNames.contains('eleves')) {
          const eleveStore = db.createObjectStore('eleves', { keyPath: 'id', autoIncrement: true });
          eleveStore.createIndex('by-matricule', 'matricule', { unique: true });
        }

        if (!db.objectStoreNames.contains('enseignants')) {
          const enseignantStore = db.createObjectStore('enseignants', { keyPath: 'id', autoIncrement: true });
          enseignantStore.createIndex('by-nom', 'nom');
        }

        if (!db.objectStoreNames.contains('cours')) {
          const coursStore = db.createObjectStore('cours', { keyPath: 'id', autoIncrement: true });
          coursStore.createIndex('by-type', 'type');
        }

        if (!db.objectStoreNames.contains('ressources')) {
          const ressourceStore = db.createObjectStore('ressources', { keyPath: 'id', autoIncrement: true });
          ressourceStore.createIndex('by-type', 'type');
        }

        if (!db.objectStoreNames.contains('services')) {
          const serviceStore = db.createObjectStore('services', { keyPath: 'id', autoIncrement: true });
          serviceStore.createIndex('by-type', 'type');
        }
      },
    });
  }

  public getDatabase(): IDBPDatabase<GestionScolaireDB> {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.db;
  }
} 