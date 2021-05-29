import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this.url = environment.api_url;
  }

  post(item, route: string = ''): Observable<any> {
    return this.httpClient
      .post(
        `${this.url}/${route !== '' ? route : ''}`,
        item
      );
  }

  put(item, route: string = ''): Observable<any> {
    return this.httpClient
      .put(
        `${this.url}/${route !== '' ? route : ''}`,
        item
      );
  }

  get(id: string, route: string = ''): Observable<any> {
    return this.httpClient
      .get(
        `${this.url}/${route !== '' ?  route : ''}${
          id !== '' ? '/' + id : ''
        }`
      );
  }
  delete(id: string, route: string = ''): Observable<any> {
    return this.httpClient
      .delete(
        `${this.url}/${route !== '' ?  route : ''}${
          id !== '' ? '/' + id : ''
        }`
      );
  }
}
