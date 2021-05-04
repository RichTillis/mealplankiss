import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealsPage } from './meals.page';

import { MealsPageRoutingModule } from './meals-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MealsPage }]),
    MealsPageRoutingModule,
  ],
  declarations: [MealsPage]
})
export class Tab3PageModule {}
