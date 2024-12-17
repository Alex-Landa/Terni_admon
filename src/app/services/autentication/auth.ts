import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';

import { environment } from '../../../../enviroment/enviroment';
import { UserModel } from '../../models/user/user.model';

const OPTIONS = {
  reportProgress: true,
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const jwtHelper = new JwtHelperService();
@Injectable()
export class AuthService {
  @Output() getUserLoggedInData: EventEmitter<any> = new EventEmitter();
  hasUser = false;
  checkAuth = setInterval(() => { null }, 0);

  constructor(private http: HttpClient, private router: Router, private rs: NgxRolesService, private ps: NgxPermissionsService) {
  }
//   getLoggedUserPermissions(username: any): Observable<any> {

//     return this.http.get(`${environment.api}/users/${username}/permissions`, OPTIONS).pipe(tap(data => {

//       return data;
//     }),
//       catchError((err: HttpErrorResponse) => {
//         return throwError(err);
//       }))
//   }

  isAuth() {
    //Token decodificado
    const decodedToken = this.getTokenData();

    if (decodedToken) {
      this.getUserLoggedInData.emit(decodedToken);
      this.hasUser = true;
      //Hacemos la carga del rol con sus respectivos permisos
      //Rol y permisos provenientes desde la base de datos

    } else {
      this.getUserLoggedInData.emit();
      this.hasUser = false;
    }
    return this.hasUser;
  }
  saveToken(data: any,opt:any) {
    let successfullySavedToken = false;
    //////el nombre del token que se espera recibir
    const encodedToken = data.token;
    const stamping=data.stamp
    //Hace falta que regrese los demas datos
    // opt.setItem("headers",new HttpHeaders())
    localStorage.setItem('token', encodedToken);
    localStorage.setItem('stamp',stamping);
    if (this.getTokenData()) {
      successfullySavedToken = true;
      opt.headers.set('Authorization',data.token)
    }
    return successfullySavedToken;
  }
  getTokenData() {
    let decodedToken;
    //Validamos el tiempo de expiracion del token
    if (localStorage.getItem('token')) {
      const encodedToken = localStorage.getItem('token')!;
      //Decodificacion del token
      decodedToken = jwtHelper.decodeToken(encodedToken);
      const timeRemaningJWT =
        decodedToken.exp - Math.floor(new Date().getTime() / 1000.0);
      if (timeRemaningJWT <= 0) {
        localStorage.removeItem('token');
        decodedToken = null;
      }
    } else {
      decodedToken = null;
    }
    return decodedToken;
  }

  logIn(user: UserModel) {
    return this.http.post(`${environment.api}/get/login`, JSON.stringify(user), OPTIONS)
      .pipe(tap(data => {
        this.saveToken(data,OPTIONS);
        clearInterval(this.checkAuth);
        this.checkAuth = setInterval(() => {
          this.isAuth()
        }, 10000);
      }))
  }
  logOut() {
    let successfullyRemovedToken = false;
    // this.rs.flushRolesAndPermissions();
    localStorage.removeItem('token');
    localStorage.removeItem('stamp');
    if (localStorage.getItem('token') === null) {
      successfullyRemovedToken = true;
      clearInterval(this.checkAuth);
      this.router.navigateByUrl('/login');
    }
    return successfullyRemovedToken;
  }
}