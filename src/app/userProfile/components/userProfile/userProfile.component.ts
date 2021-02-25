import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {UserProfileInterface} from '../../types/userProfile.interface';
import {select, Store} from '@ngrx/store';
import {getUserProfileAction} from '../../store/actions/getUserProfile.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {errorSelector, isLoadingSelector, userProfileSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy{

  userProfile: UserProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string|null>;
  userProfileSubscription: Subscription;
  slug: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store.pipe(select(userProfileSelector))
    .subscribe( (userProfile: UserProfileInterface) => {
      this.userProfile = userProfile;
    });

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
      }
    );

  }
  initializeValues(): void {

    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))]
    ).pipe(map(([currentUser, userProfile]: [CurrentUserInterface, UserProfileInterface]) => {
      return currentUser.username === userProfile.username;
    }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites ? `/articles?favorited=${this.slug}` : `/article?author=${this.slug}`;
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
