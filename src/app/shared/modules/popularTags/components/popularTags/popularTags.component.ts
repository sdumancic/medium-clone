import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActionTypes} from '../../store/actionTypes';
import {AppStateInterface} from '../../../../types/appState.interface';
import {getPopularTagsAction} from '../../store/actions/getPopularTags.action';
import {PopularTagType} from '../../../../types/popularTag.type';
import {Observable} from 'rxjs';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../../store/selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html'
})
export class PopularTagsComponent implements OnInit{


  constructor(private store: Store<AppStateInterface>) {
  }

  popularTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string|null>;

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }
  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }

}
