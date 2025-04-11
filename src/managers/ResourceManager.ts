import { IRessource } from '../interfaces';
import { Database } from '../database/Database';

export class ResourceManager {
  private static instance: ResourceManager;
  private resources: Map<number, IRessource> = new Map();

  private constructor() {}

  public static getInstance(): ResourceManager {
    if (!ResourceManager.instance) {
      ResourceManager.instance = new ResourceManager();
    }
    return ResourceManager.instance;
  }

  public async initialize(): Promise<void> {
    const db = Database.getInstance();
    await db.initialize();
    const database = db.getDatabase();
    
    // Charger toutes les ressources depuis IndexedDB
    const resources = await database.getAll('ressources');
    resources.forEach(resource => {
      this.resources.set(resource.id, resource);
    });
  }

  public async addResource(resource: IRessource): Promise<number> {
    const db = Database.getInstance().getDatabase();
    const id = await db.add('ressources', resource);
    resource.id = id;
    this.resources.set(id, resource);
    return id;
  }

  public async getResource(id: number): Promise<IRessource | undefined> {
    return this.resources.get(id);
  }

  public async getAllResources(): Promise<IRessource[]> {
    return Array.from(this.resources.values());
  }

  public async updateResource(id: number, resource: IRessource): Promise<void> {
    const db = Database.getInstance().getDatabase();
    await db.put('ressources', { ...resource, id });
    this.resources.set(id, { ...resource, id });
  }

  public async deleteResource(id: number): Promise<void> {
    const db = Database.getInstance().getDatabase();
    await db.delete('ressources', id);
    this.resources.delete(id);
  }

  public async getResourcesByType(type: string): Promise<IRessource[]> {
    const db = Database.getInstance().getDatabase();
    return await db.getAllFromIndex('ressources', 'by-type', type);
  }

  public async isResourceAvailable(id: number): Promise<boolean> {
    const resource = await this.getResource(id);
    return resource ? resource.disponible : false;
  }

  public async setResourceAvailability(id: number, available: boolean): Promise<void> {
    const resource = await this.getResource(id);
    if (resource) {
      resource.disponible = available;
      await this.updateResource(id, resource);
    }
  }
} 