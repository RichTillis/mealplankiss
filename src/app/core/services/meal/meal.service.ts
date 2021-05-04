/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { Meal } from '../../../interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private mealsCollection: AngularFirestoreCollection<Meal>;
  meals$: Observable<Meal[]>;
  private basePath = '/images';
  downloadableURL = '';
  private task: AngularFireUploadTask;

  constructor(private readonly angularFirestore: AngularFirestore, private fireStorage: AngularFireStorage) {
    this.mealsCollection = angularFirestore.collection<Meal>('meals');
    this.meals$ = this.mealsCollection.valueChanges();
  }

  updateMeal(meal: Meal) {
    if (!meal.id) {
      meal.id = this.createId();
    }
    return this.mealsCollection.doc(meal.id).set(meal);
  }

  private createId() {
    return this.angularFirestore.createId();
  }

  deleteMeal(id: string) {
    return this.mealsCollection.doc(id).delete();
  }
}
