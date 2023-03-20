import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserPostsService {
  
  private url='http://localhost:3000/';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
   
  getPosts(){
    return this.httpClient.get(this.url + 'posts');
  }

  getUsers() {
    return this.httpClient.get(this.url + 'users');
  }
  
  addUser(name: string, email: string): Observable<any> {
    return this.httpClient.put(this.url + 'users/?name=' + name + '&email=' + email , {});
  }

  getUserById(id: number) {
    let API_URL = this.url + 'users/' + id;
      return this.httpClient.get(API_URL, { headers: this.httpHeaders })
        .pipe(map((res: any) => {
                return res || {}
        })
      )
  }
  
  editUser(id: number, data: any): Observable<any> {
    let API_URL = this.url + 'users/' + id;
      return this.httpClient.post(API_URL, data, { headers: this.httpHeaders});
  }
}
