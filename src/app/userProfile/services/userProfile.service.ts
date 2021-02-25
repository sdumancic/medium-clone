import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserProfileInterface} from '../types/userProfile.interface';
import {HttpClient} from '@angular/common/http';
import {GetUserProfileResponseInterface} from '../types/getUserProfileResponse.interface';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;

    return this.http.get(url).pipe(map((response: GetUserProfileResponseInterface) => response.profile));
  }
}
