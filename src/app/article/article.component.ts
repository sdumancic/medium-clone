import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from './store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {ArticleInterface} from '../shared/types/article.interface';
import {combineLatest, Observable, pipe, Subscription} from 'rxjs';
import {articleSelector, errorSelector, isLoadingSelector} from './store/selectors';
import {GetCurrentUserEffect} from '../auth/store/effects/getCurrentUser.effect';
import {currentUserSelector} from '../auth/store/selectors';
import {map} from 'rxjs/operators';
import {CurrentUserInterface} from '../shared/types/currentUser.interface';
import {deleteArticleAction} from './store/actions/deleteArticle.action';


@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy{

  slug: string;
  article: ArticleInterface;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string|null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ]).pipe(
        map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        })
    );

  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }


  private fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }



  private initializeListeners(): void {
    this.articleSubscription = this.store.pipe(select(articleSelector)).subscribe((article: ArticleInterface | null ) =>{
      this.article = article;
    });
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }
}
