import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFeedAction} from './store/actions/getFeed.action';
import {Observable, Subscription} from 'rxjs';
import {GetFeedResponseInterface} from './types/getFeedResponse.interface';
import {errorSelector, feedSelector, isLoadingSelector} from './store/selectors';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy{

  @Input('apiUrl') apiUrlProps: string;

  feed$: Observable<GetFeedResponseInterface | null>;
  error$: Observable<string|null>;
  isLoading$: Observable<boolean>;
  limit = environment.limit;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();

  }

  private initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params.page || '1');
    });
  }

  private initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  private fetchData(): void  {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();

  }



}
