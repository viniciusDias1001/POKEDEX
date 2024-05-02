import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from './components/auth/page/sign/usuario';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiURL : string = environment.apiURL;
  apiURLUser : string = environment.apiURLUser;
  constructor(private HttpClient : HttpClient)

  { }

  salvar(usuario : any) : Observable<Usuario>{
    return this.HttpClient.post<Usuario>(this.apiURLUser, usuario).pipe(map((data) => {
      console.log(data);
      return data;
    }),catchError ((error) => {
      console.error(error);
      return throwError("error saving user");
    }));
  }

  tentarLogar(email: string, password: string): Observable<any> {
    return this.HttpClient.get(`${this.apiURL}/user?email=${email}`).pipe(

      map((user: any) => {
        console.log(user);
        if (user.password === password) {
          return user;
        } else {
          throw new Error('INVALID_PASSWORD');
        }
      }),
      catchError(error => {
        console.error(error);
      return throwError("Email or password invalid");
      })
    );
  }
}

