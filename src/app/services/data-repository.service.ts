import { Injectable } from '@angular/core';

import { Observable, Subject, EMPTY, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { IUser } from '../user/user.model';
import { IClass, ICourse } from '../catalog/class.model';

@Injectable({ providedIn : 'root'})
export class DataRepositoryService {
  currentUser: IUser | null = null;

  constructor() {}

  getCatalog():Observable<any[]> {
    const subject = new Subject<any>();
    const currentUser = this.currentUser || {classes:[]};
    const catalogWithEnrollmentStatus =
      courseCatalog.map(catalogClass => {
        let enrolled = {enrolled: currentUser.classes.includes(catalogClass.classId)};
        return Object.assign(catalogClass, enrolled);
      });
    setTimeout(() => {subject.next(catalogWithEnrollmentStatus); subject.complete();}, 200);

    return subject;
  }

  saveUser(user): Observable<any> {
    let classes = user.classes || [];
    // On mets à jour le currentUser avec un nouvel objet qui est alimenté
    // par toutes les propriétés de la classe user qui est passée en second param.
    this.currentUser = {...user, classes: [...classes]};

    return EMPTY.pipe(delay(1000));
  }

  enroll(classId): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Already enrolled'));

    // Exemple de mise en place du concept d'immutabilité.
    // Le second param permet de surchager le paramètre de l'objet en fournissant la nouvelle propriété.
    // La méthode concact permet de renvoyer une nouvelle liste à laquelle on ajout la propriété classId
    // c'est une meilleur pratique que de la rajouter à la liste existante.
    this.currentUser = { ...this.currentUser, classes: this.currentUser.classes.concat(classId) }

    // this.currentUser = user => ne respecte pas le principe d'immutabilité.
    // sinon les deux variables vont pointées vers le même objet en mémoire.
    // User aurait pu être modifié à l'extérieur de la fonction = données corrompues.

    return EMPTY.pipe(delay(1000));
  }

  drop(classId): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (!this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Not enrolled'));

    // Immutabilité 
    // Ici, la propriété classes est spécifiquement remplacée par une nouvelle valeur. 
    // Plutôt que de simplement copier l'ancien tableau classes, on applique un filtre pour créer une nouvelle version de ce tableau.
    this.currentUser = { ...this.currentUser, classes: this.currentUser.classes.filter(c => c !== classId)};

    return EMPTY.pipe(delay(3000));
  }

  signIn(credentials): Observable<any> {
    //Never, ever check credentials in client-side code.
    //This code is only here to supply a fake endpoint for signing in.
    if (credentials.email !== 'me@whitebeards.edu' || credentials.password !== 'super-secret')
      return throwError(() => new Error('Invalid login'));

    this.currentUser = {
      userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
      firstName: 'Jim',
      lastName: 'Cooper',
      email: 'me@whitebeards.edu',
      classes: ['24ab7b14-f935-44c1-b91b-8598123ea54a']
    };

    return EMPTY;
  }
}

const courses: ICourse[] = [{
  courseNumber: 'PO101',
  courseName: 'Intro to Potions',
  creditHours: 3,
  description: '...'
}, {
  courseNumber: 'HIS105',
  courseName: 'Ancient History of Magic',
  creditHours: 4,
  description: '...'
},{
  courseNumber: 'CH101',
  courseName: 'Intro to Charms',
  creditHours: 4,
  description: '...'
},{
  courseNumber: 'CH205',
  courseName: 'Creating Advanced Charms',
  creditHours: 4,
  description: '...'
},{
  courseNumber: 'SP101',
  courseName: 'Intro Spell Casting',
  creditHours: 4,
  description: '...'
},{
  courseNumber: 'SP201',
  courseName: 'Advanced Spell Casting',
  creditHours: 4,
  description: '...'
}];

const courseCatalog: IClass[] = [{
  classId: '24ab7b14-f935-44c1-b91b-8598123ea54a',
  course: courses[0],
  professor: 'Abramius Darksbayn',
  seatsAvailable: 23,
  days: 'MWF',
  time: 11
}, {
  classId: 'cebbc5ba-f49a-4708-b3dc-51a346b3231e',
  course: courses[0],
  professor: 'Philosifus Siebrand',
  seatsAvailable: 9,
  days: 'MWF',
  time: 12
}, {
  classId: '6130cdd4-071a-4559-8072-35f0fbec5516',
  course: courses[0],
  professor: 'Abramius Darksbayn',
  seatsAvailable: 14,
  days: 'THF',
  time: 2
}, {
  classId: 'dd0343e9-50b2-4f1d-8b87-93c0b34f3d35',
  course: courses[1],
  professor: 'Antonia Clavell',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[2],
  professor: 'Meriel Dufaux',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[3],
  professor: 'Adranus Klaus',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[4],
  professor: 'Ragnvald Graupnar',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[5],
  professor: 'Philosifus Siebrand',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[2],
  professor: 'Phoebe Chabon',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[3],
  professor: 'Sycily Soule',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
},{
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[4],
  professor: 'Heldebald Cincebeaux',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
}, {
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: courses[5],
  professor: 'Gerlinda Weinschroot',
  seatsAvailable: 28,
  days: 'THF',
  time: 11
}];

const users: IUser[] = [{
  userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
  firstName: 'Jim',
  lastName: 'Cooper',
  email: 'someones-email@gmail.com',
  password: 'supersecret',
  classes: ['24ab7b14-f935-44c1-b91b-8598123ea54a']
}];
