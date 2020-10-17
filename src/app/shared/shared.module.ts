import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormElementsComponent } from './components/dynamic-form-elements/dynamic-form-elements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

@NgModule({
  declarations: [DynamicFormElementsComponent,DialogBoxComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [DynamicFormElementsComponent,DialogBoxComponent]
})
export class SharedModule { }
