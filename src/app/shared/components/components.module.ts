import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [ListComponent],
  exports: [ListComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CardComponent],
})
export class ComponentsModule {}
