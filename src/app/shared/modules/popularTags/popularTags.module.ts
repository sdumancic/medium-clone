import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {GetPopularTagsEffect} from './store/effects/getPopularTags.effect';
import {PopularTagsComponent} from './components/popularTags/popularTags.component';
import {RouterModule} from '@angular/router';
import {LoadingModule} from '../loading/loading.module';
import {ErrorMessageModule} from '../errorMessage/errorMessage.module';
import {PopularTagsService} from './services/popularTags.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoadingModule,
    ErrorMessageModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect])
  ],
  declarations:[
    PopularTagsComponent
  ],
  exports: [
    PopularTagsComponent
  ],
  providers: [
    PopularTagsService
  ]
})
export class PopularTagsModule{}
