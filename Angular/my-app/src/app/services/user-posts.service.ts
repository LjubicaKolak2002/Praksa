import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserPostsService {
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
   
  getPosts(){
    return this.httpClient.get('http://127.0.0.1:3080/api/posts/');
  }

  getUsers() {
    return this.httpClient.get('http://127.0.0.1:3080/api/users');
  }
  
  addUser(name: string, email: string): Observable<any> {
    return this.httpClient.put(`http://127.0.0.1:3080/api/users?name=${name}&email=${email}` , {});
  }

  getUserById(id: number) {
    let API_URL = `http://127.0.0.1:3080/api/users/${id}`;
      return this.httpClient.get(API_URL, { headers: this.httpHeaders })
        .pipe(map((res: any) => {
                return res || {}
        })
      )
  }
  
  editUser(id: number, data: any): Observable<any> {
    let API_URL = `http://127.0.0.1:3080/api/users/${id}`;
      return this.httpClient.post(API_URL, data, { headers: this.httpHeaders});
  }
}
