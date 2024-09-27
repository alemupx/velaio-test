import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, ComponentsModule, CardComponent],
  declarations: [HomePage],
})
export class HomeModule {}
