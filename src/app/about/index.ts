import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';

import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ AboutComponent ]
})
export class AboutModule { }
