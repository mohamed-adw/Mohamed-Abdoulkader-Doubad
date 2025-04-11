import { EleveDAO } from '../dao/EleveDAO';
import { IEleve } from '../interfaces';
import { Database } from '../database/Database';

// Mock de la base de données
jest.mock('../database/Database', () => {
  return {
    Database: {
      getInstance: jest.fn().mockReturnValue({
        initialize: jest.fn(),
        getDatabase: jest.fn().mockReturnValue({
          add: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
          put: jest.fn(),
          delete: jest.fn(),
          getFromIndex: jest.fn()
        })
      })
    }
  };
});

describe('EleveDAO', () => {
  let eleveDAO: EleveDAO;
  let mockEleve: IEleve;

  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
    
    eleveDAO = EleveDAO.getInstance();
    mockEleve = {
      nom: 'Dupont',
      prenom: 'Jean',
      matricule: 'E12345',
      listeCours: [],
      listeServices: []
    };
  });

  describe('ajouter', () => {
    it('devrait ajouter un élève avec succès', async () => {
      const mockId = 1;
      const db = Database.getInstance().getDatabase();
      (db.add as jest.Mock).mockResolvedValue(mockId);

      const id = await eleveDAO.ajouter(mockEleve);

      expect(id).toBe(mockId);
      expect(db.add).toHaveBeenCalledWith('eleves', mockEleve);
    });
  });

  describe('obtenir', () => {
    it('devrait obtenir un élève par son ID', async () => {
      const db = Database.getInstance().getDatabase();
      (db.get as jest.Mock).mockResolvedValue(mockEleve);

      const eleve = await eleveDAO.obtenir(1);

      expect(eleve).toEqual(mockEleve);
      expect(db.get).toHaveBeenCalledWith('eleves', 1);
    });

    it('devrait retourner undefined si l\'élève n\'existe pas', async () => {
      const db = Database.getInstance().getDatabase();
      (db.get as jest.Mock).mockResolvedValue(undefined);

      const eleve = await eleveDAO.obtenir(999);

      expect(eleve).toBeUndefined();
    });
  });

  describe('rechercherParMatricule', () => {
    it('devrait trouver un élève par son matricule', async () => {
      const db = Database.getInstance().getDatabase();
      (db.getFromIndex as jest.Mock).mockResolvedValue(mockEleve);

      const eleve = await eleveDAO.rechercherParMatricule('E12345');

      expect(eleve).toEqual(mockEleve);
      expect(db.getFromIndex).toHaveBeenCalledWith('eleves', 'by-matricule', 'E12345');
    });
  });

  describe('ajouterCours', () => {
    it('devrait ajouter un cours à la liste des cours d\'un élève', async () => {
      const db = Database.getInstance().getDatabase();
      (db.get as jest.Mock).mockResolvedValue({ ...mockEleve });
      
      await eleveDAO.ajouterCours(1, 1);

      expect(db.put).toHaveBeenCalled();
      const updatedEleve = (db.put as jest.Mock).mock.calls[0][1];
      expect(updatedEleve.listeCours).toContain(1);
    });

    it('devrait lever une erreur si l\'élève n\'existe pas', async () => {
      const db = Database.getInstance().getDatabase();
      (db.get as jest.Mock).mockResolvedValue(undefined);

      await expect(eleveDAO.ajouterCours(999, 1)).rejects.toThrow('Élève non trouvé');
    });
  });
}); 