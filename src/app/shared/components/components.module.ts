import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  exports: [ListComponent],

  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ComponentsModule {}
