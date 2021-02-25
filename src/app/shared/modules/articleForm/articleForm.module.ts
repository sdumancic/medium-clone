import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleFormComponent} from './articleForm.component';
import {BackendErrorMessagesModule} from '../backendErrorMessages/backendErrorMessages.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BackendErrorMessagesModule,
    ReactiveFormsModule
  ],
  declarations: [
    ArticleFormComponent
  ],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule {
}
