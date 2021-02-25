import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../shared/types/article.interface';

export interface EditArticleStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  article: ArticleInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
