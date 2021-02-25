import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleInputInterface} from '../../shared/types/articleInput.interface';
import {ArticleInterface} from '../../shared/types/article.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SaveArticleResponseInterface} from '../../shared/types/saveArticleResponse.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class CreateArticleService{

  constructor(private http: HttpClient){}

  createArticle(articleInput: ArticleInputInterface): Observable<ArticleInterface>{
    const fullUrl = environment.apiUrl + '/articles';
    return this.http.post<SaveArticleResponseInterface>(fullUrl, articleInput)
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          return response.article;
        })
      );

  }
}
