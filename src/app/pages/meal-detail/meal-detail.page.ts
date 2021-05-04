import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Meal } from 'src/app/interfaces/meal';
import { MealService } from '../../core/services/meal/meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {
  @Input()
  meal: Meal;

  mealForm!: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private mealService: MealService) {
    this.mealForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    if (this.meal) {
      this.mealForm.patchValue({
        title: this.meal.title,
        description: this.meal.description
      });
    }
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  createMeal() {
    if (this.mealForm.valid) {
      // if (this.meal) {
      //   this.meal = { ...this.meal, ...this.mealForm.value };
      // }
      // else {
      //   const title: string = this.mealForm.get('title').value;
      //   const newMeal: Meal = { title };
      // }

      this.meal = { ...this.meal, ...this.mealForm.value };
      console.log(this.meal);

      this.mealService.updateMeal(this.meal).then(() => {
        this.closeModal();
      });
    }
  }

  deleteMeal(){
    this.mealService.deleteMeal(this.meal.id).then(() => {
      this.closeModal();
    });
  }

}
