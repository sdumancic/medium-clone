import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './feed.component';
import {FeedService} from './services/feed.service';
import {EffectsModule} from '@ngrx/effects';
import {GetFeedEffect} from './store/effects/getFeed.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {RouterModule} from '@angular/router';
import {ErrorMessageModule} from '../errorMessage/errorMessage.module';
import {LoadingModule} from '../loading/loading.module';
import {PaginationModule} from '../pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorMessageModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    LoadingModule,
    PaginationModule
  ],
  declarations: [
    FeedComponent
  ],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {
}