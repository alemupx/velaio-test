import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  exports: [ListComponent],

  imports: [CommonModule, ReactiveFormsModule],
})
export class ComponentsModule {}
