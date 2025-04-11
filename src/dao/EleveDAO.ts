import { IEleve, IDAO } from '../interfaces';
import { Database } from '../database/Database';

export class EleveDAO implements IDAO<IEleve> {
  private static instance: EleveDAO;
  private db: Database;

  private constructor() {
    this.db = Database.getInstance();
  }

  public static getInstance(): EleveDAO {
    if (!EleveDAO.instance) {
      EleveDAO.instance = new EleveDAO();
    }
    return EleveDAO.instance;
  }

  public async ajouter(eleve: IEleve): Promise<number> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.add('eleves', eleve);
  }

  public async obtenir(id: number): Promise<IEleve | undefined> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.get('eleves', id);
  }

  public async listerTous(): Promise<IEleve[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAll('eleves');
  }

  public async modifier(id: number, eleve: IEleve): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.put('eleves', { ...eleve, id });
  }

  public async supprimer(id: number): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.delete('eleves', id);
  }

  // Méthodes spécifiques aux élèves
  public async rechercherParMatricule(matricule: string): Promise<IEleve | undefined> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getFromIndex('eleves', 'by-matricule', matricule);
  }

  public async ajouterCours(eleveId: number, coursId: number): Promise<void> {
    const eleve = await this.obtenir(eleveId);
    if (!eleve) throw new Error('Élève non trouvé');
    
    if (!eleve.listeCours) {
      eleve.listeCours = [];
    }
    
    if (!eleve.listeCours.includes(coursId)) {
      eleve.listeCours.push(coursId);
      await this.modifier(eleveId, eleve);
    }
  }

  public async ajouterService(eleveId: number, serviceId: number): Promise<void> {
    const eleve = await this.obtenir(eleveId);
    if (!eleve) throw new Error('Élève non trouvé');
    
    if (!eleve.listeServices) {
      eleve.listeServices = [];
    }
    
    if (!eleve.listeServices.includes(serviceId)) {
      eleve.listeServices.push(serviceId);
      await this.modifier(eleveId, eleve);
    }
  }
} 