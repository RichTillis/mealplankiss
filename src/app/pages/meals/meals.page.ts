import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MealDetailPage } from '../meal-detail/meal-detail.page';
import { AuthService } from '../../core/services/auth/auth.service';
import { MealService } from '../../core/services/meal/meal.service';
import { Meal } from 'src/app/interfaces/meal';

@Component({
  selector: 'app-meals',
  templateUrl: 'meals.page.html',
  styleUrls: ['meals.page.scss']
})
export class MealsPage {

  meals$ = this.mealService.meals$;
  isFullyAuthenticated$ = this.authService.isFullyAuthenticated$;
  constructor(private authService: AuthService, public modalController: ModalController, private mealService: MealService) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  createNewMeal() {
    console.log('new meals clicked');
    this.presentModal();
  }

  async presentModal(meal?: Meal) {
    const modal = await this.modalController.create({
      component: MealDetailPage,
      componentProps: {
        meal
      }
    });
    return await modal.present();
  }

  viewMeal(meal: Meal) {
    console.log('meal: ', meal);
    this.presentModal(meal);
  }
}
