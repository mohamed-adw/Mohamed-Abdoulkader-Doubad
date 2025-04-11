import { ICours } from '../interfaces';

abstract class Cours implements ICours {
  id?: number;
  constructor(
    public nom: string,
    public type: string,
    public enseignantId: number
  ) {}

  abstract getDescription(): string;
}

class CoursMath extends Cours {
  constructor(nom: string, enseignantId: number) {
    super(nom, 'Math', enseignantId);
  }

  getDescription(): string {
    return `Cours de mathématiques: ${this.nom}`;
  }
}

class CoursHistoire extends Cours {
  constructor(nom: string, enseignantId: number) {
    super(nom, 'Histoire', enseignantId);
  }

  getDescription(): string {
    return `Cours d'histoire: ${this.nom}`;
  }
}

class CoursScience extends Cours {
  constructor(nom: string, enseignantId: number) {
    super(nom, 'Science', enseignantId);
  }

  getDescription(): string {
    return `Cours de sciences: ${this.nom}`;
  }
}

export class CourseFactory {
  static createCourse(type: string, nom: string, enseignantId: number): Cours {
    switch (type.toLowerCase()) {
      case 'math':
        return new CoursMath(nom, enseignantId);
      case 'histoire':
        return new CoursHistoire(nom, enseignantId);
      case 'science':
        return new CoursScience(nom, enseignantId);
      default:
        throw new Error(`Type de cours inconnu: ${type}`);
    }
  }
} 