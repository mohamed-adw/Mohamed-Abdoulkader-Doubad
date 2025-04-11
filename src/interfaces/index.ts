export interface IEleve {
  id?: number;
  nom: string;
  prenom: string;
  matricule: string;
  listeCours: ICours[];
  listeServices: IServiceSupplementaire[];
}

export interface IEnseignant {
  id?: number;
  nom: string;
  prenom: string;
  listeCours: ICours[];
}

export interface ICours {
  id?: number;
  nom: string;
  type: string;
  enseignantId: number;
}

export interface IServiceSupplementaire {
  id?: number;
  nom: string;
  type: 'sport' | 'art' | 'tutorat';
  description?: string;
}

export interface IRessource {
  id?: number;
  nom: string;
  type: 'salle' | 'materiel' | 'fourniture';
  disponible: boolean;
  description?: string;
}

export interface IDAO<T> {
  ajouter(item: T): Promise<number>;
  obtenir(id: number): Promise<T | undefined>;
  listerTous(): Promise<T[]>;
  modifier(id: number, item: T): Promise<void>;
  supprimer(id: number): Promise<void>;
} 