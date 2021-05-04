import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealDetailPageRoutingModule } from './meal-detail-routing.module';

import { MealDetailPage } from './meal-detail.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MealDetailPageRoutingModule
  ],
  declarations: [MealDetailPage]
})
export class MealDetailPageModule {}
