import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { HomeComponent, AddReviewDialogComponent, AlarmSnackComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    AddReviewDialogComponent,
    AlarmSnackComponent
  ],
  entryComponents: [AddReviewDialogComponent, AlarmSnackComponent],
})
export class HomeModule { }
