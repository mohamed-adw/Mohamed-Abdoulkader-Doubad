import { IEleve, IServiceSupplementaire } from '../interfaces';

export interface EleveComponent {
  getDescription(): string;
  getCout(): number;
  getServices(): IServiceSupplementaire[];
}

export class EleveBase implements EleveComponent {
  constructor(private eleve: IEleve) {}

  getDescription(): string {
    return `${this.eleve.prenom} ${this.eleve.nom}`;
  }

  getCout(): number {
    return 0; // Coût de base
  }

  getServices(): IServiceSupplementaire[] {
    return [];
  }
}

abstract class ServiceDecorator implements EleveComponent {
  constructor(protected eleve: EleveComponent) {}

  abstract getDescription(): string;
  abstract getCout(): number;
  abstract getServices(): IServiceSupplementaire[];
}

export class TutoratDecorator extends ServiceDecorator {
  private readonly COUT_TUTORAT = 50;

  getDescription(): string {
    return `${this.eleve.getDescription()} + Tutorat`;
  }

  getCout(): number {
    return this.eleve.getCout() + this.COUT_TUTORAT;
  }

  getServices(): IServiceSupplementaire[] {
    return [...this.eleve.getServices(), {
      nom: 'Tutorat',
      type: 'tutorat',
      description: 'Service de tutorat personnalisé'
    }];
  }
}

export class SportDecorator extends ServiceDecorator {
  private readonly COUT_SPORT = 30;

  getDescription(): string {
    return `${this.eleve.getDescription()} + Sport`;
  }

  getCout(): number {
    return this.eleve.getCout() + this.COUT_SPORT;
  }

  getServices(): IServiceSupplementaire[] {
    return [...this.eleve.getServices(), {
      nom: 'Sport',
      type: 'sport',
      description: 'Activités sportives'
    }];
  }
}

export class ArtDecorator extends ServiceDecorator {
  private readonly COUT_ART = 40;

  getDescription(): string {
    return `${this.eleve.getDescription()} + Art`;
  }

  getCout(): number {
    return this.eleve.getCout() + this.COUT_ART;
  }

  getServices(): IServiceSupplementaire[] {
    return [...this.eleve.getServices(), {
      nom: 'Art',
      type: 'art',
      description: 'Activités artistiques'
    }];
  }
} 