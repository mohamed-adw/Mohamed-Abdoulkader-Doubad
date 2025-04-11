import { ICours, IDAO } from '../interfaces';
import { Database } from '../database/Database';
import { CourseFactory } from '../factories/CourseFactory';

export class CoursDAO implements IDAO<ICours> {
  private static instance: CoursDAO;
  private db: Database;

  private constructor() {
    this.db = Database.getInstance();
  }

  public static getInstance(): CoursDAO {
    if (!CoursDAO.instance) {
      CoursDAO.instance = new CoursDAO();
    }
    return CoursDAO.instance;
  }

  public async ajouter(cours: ICours): Promise<number> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    // Utiliser la factory pour créer le cours
    const nouveauCours = CourseFactory.createCourse(cours.type, cours.nom, cours.enseignantId);
    return await database.add('cours', nouveauCours);
  }

  public async obtenir(id: number): Promise<ICours | undefined> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.get('cours', id);
  }

  public async listerTous(): Promise<ICours[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAll('cours');
  }

  public async modifier(id: number, cours: ICours): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.put('cours', { ...cours, id });
  }

  public async supprimer(id: number): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.delete('cours', id);
  }

  // Méthodes spécifiques aux cours
  public async rechercherParType(type: string): Promise<ICours[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAllFromIndex('cours', 'by-type', type);
  }

  public async getCoursParEnseignant(enseignantId: number): Promise<ICours[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    const tousLesCours = await this.listerTous();
    return tousLesCours.filter(cours => cours.enseignantId === enseignantId);
  }

  public async verifierDisponibilite(coursId: number, plageHoraire: string): Promise<boolean> {
    // TODO: Implémenter la vérification de disponibilité avec un système de plages horaires
    return true;
  }
} 