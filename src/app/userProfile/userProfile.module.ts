import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserProfileComponent} from './components/userProfile/userProfile.component';
import {UserProfileService} from './services/userProfile.service';
import {Effect, EffectsModule} from '@ngrx/effects';
import {GetUserProfileEffect} from './store/effects/getUserProfile.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {FeedModule} from '../shared/modules/feed/feed.module';

const routes = [
  {path: 'profiles/:slug', component: UserProfileComponent},
  {path: 'profiles/:slug/favorites', component: UserProfileComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers), FeedModule],
  declarations: [UserProfileComponent],
  providers: [UserProfileService]
})
export class UserProfileModule{

}
