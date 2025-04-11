import { IServiceSupplementaire, IDAO } from '../interfaces';
import { Database } from '../database/Database';

export class ServiceDAO implements IDAO<IServiceSupplementaire> {
  private static instance: ServiceDAO;
  private db: Database;

  private constructor() {
    this.db = Database.getInstance();
  }

  public static getInstance(): ServiceDAO {
    if (!ServiceDAO.instance) {
      ServiceDAO.instance = new ServiceDAO();
    }
    return ServiceDAO.instance;
  }

  public async ajouter(service: IServiceSupplementaire): Promise<number> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.add('services', service);
  }

  public async obtenir(id: number): Promise<IServiceSupplementaire | undefined> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.get('services', id);
  }

  public async listerTous(): Promise<IServiceSupplementaire[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAll('services');
  }

  public async modifier(id: number, service: IServiceSupplementaire): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.put('services', { ...service, id });
  }

  public async supprimer(id: number): Promise<void> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    await database.delete('services', id);
  }

  // Méthodes spécifiques aux services
  public async rechercherParType(type: 'sport' | 'art' | 'tutorat'): Promise<IServiceSupplementaire[]> {
    await this.db.initialize();
    const database = this.db.getDatabase();
    return await database.getAllFromIndex('services', 'by-type', type);
  }
} 