import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleInterface} from '../../../types/article.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';
import {GetArticleResponseInterface} from '../../../types/getArticleResponse.interface';

@Injectable()
export class AddToFavoritesService {


  constructor(private http: HttpClient) {  }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.post(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.delete(url).pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
