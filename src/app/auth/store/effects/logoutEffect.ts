import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {logoutAction} from '../actions/sync.action';
import {tap} from 'rxjs/operators';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {Router} from '@angular/router';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(() => this.action$.pipe(
    ofType(logoutAction),
    tap(() => {
      this.persistenceService.set('accessToken', '');
      this.router.navigateByUrl('/');
    })
  ), {dispatch: false});

  constructor(private action$: Actions,
              private persistenceService: PersistenceService,
              private router: Router) {  }

}
