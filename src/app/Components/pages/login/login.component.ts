import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
// import { firstValueFrom } from 'rxjs';
// import { IpService } from '../../services/ip_addr/ip_addr';
import { AuthService } from '../../../services/autentication/auth';
import { environment } from '../../../../../enviroment/enviroment'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  siteKey: string;
  appVersion: string;
  appAlias: string;
  aFormGroup: any;
  contador = 1;
  fieldTextType: boolean = false;
  constructor(private router: Router, public formBuilder: FormBuilder, public auth: AuthService,) {
    this.appVersion = environment.version;
    this.appAlias = environment.alias;
    this.siteKey = environment.key;
    // this.ipService.getIpAddress().subscribe((data)=>{
    //   this.ip=data.ip;
    // });
  }
  async ngOnInit():  Promise<void> {
    this.aFormGroup = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", Validators.required],
      recaptcha: ["", this.contador > 3 ? Validators.required : Validators.nullValidator]
    });
  }
  onSubmit() {//cuando son mas de 3 errores, despliega el captcha
    if (this.contador > 3) {
      if (this.aFormGroup.value.recaptcha != "") {

        this.aFormGroup.value.recaptcha = "";
        this.aFormGroup.value = {
          user: this.aFormGroup.value.username,
          password: this.aFormGroup.value.password,
        };
        this.auth.logIn(this.aFormGroup.value).subscribe({
          complete:() => {this.router.navigateByUrl("/productos")},
          error:(err)=>{this.router.navigateByUrl("/login"),
            Swal.fire({
              icon: "error",
              title: "Error al autenticar",
              text: err.error.message,
            });
          }
        });
      }
    } else {
      this.aFormGroup.value = {
        user: this.aFormGroup.value.username,
        password: this.aFormGroup.value.password,
      };
      this.auth.logIn(this.aFormGroup.value).subscribe({
        complete:() => {this.router.navigateByUrl("/home")},
        error:(err)=>{this.router.navigateByUrl("/home");
          console.log(err)
          Swal.fire({
            icon: "error",
            title: "Error al autenticar",
            text: err.error.message,
          });
          this.contador++;
        }
       });
    }
    // this.auth.logOut()
  }

  onLogout(){
    this.contador=0
    console.log ("salida")
    this.auth.logOut()
  }
  get username() {
    return this.aFormGroup.get('username');
  }
  get password() {
    return this.aFormGroup.get('password');
  }
  get recaptcha() {
    return this.aFormGroup.get('recaptcha');
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
