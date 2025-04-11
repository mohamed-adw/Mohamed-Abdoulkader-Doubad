import { IEnseignant, IDAO } from '../interfaces';
import { Database } from '../database/Database';

export class EnseignantDAO implements IDAO<IEnseignant> {
  private static instance: EnseignantDAO;
  private db: Database;

  private constructor() {
    this.db = Database.getInstance();
  }

  public static getInstance(): EnseignantDAO {
    if (!EnseignantDAO.instance) {
      EnseignantDAO.instance = new EnseignantDAO();
    }
    return EnseignantDAO.instance;
  }

  public async ajouter(enseignant: IEnseignant): Promise<number> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.add('enseignants', enseignant);
  }

  public async obtenir(id: number): Promise<IEnseignant | undefined> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.get('enseignants', id);
  }

  public async listerTous(): Promise<IEnseignant[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAll('enseignants');
  }

  public async modifier(id: number, enseignant: IEnseignant): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.put('enseignants', { ...enseignant, id });
  }

  public async supprimer(id: number): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.delete('enseignants', id);
  }

  // Méthodes spécifiques aux enseignants
  public async rechercherParNom(nom: string): Promise<IEnseignant[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAllFromIndex('enseignants', 'by-nom', nom);
  }

  public async ajouterCours(enseignantId: number, coursId: number): Promise<void> {
    const enseignant = await this.obtenir(enseignantId);
    if (!enseignant) throw new Error('Enseignant non trouvé');
    
    if (!enseignant.listeCours) {
      enseignant.listeCours = [];
    }
    
    if (!enseignant.listeCours.includes(coursId)) {
      enseignant.listeCours.push(coursId);
      await this.modifier(enseignantId, enseignant);
    }
  }

  public async getCoursEnseignes(enseignantId: number): Promise<number[]> {
    const enseignant = await this.obtenir(enseignantId);
    if (!enseignant) throw new Error('Enseignant non trouvé');
    return enseignant.listeCours || [];
  }
} 