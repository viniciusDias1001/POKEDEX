import { Router } from '@angular/router';
import { AuthService } from './../../../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  mgError?: string;

  constructor(private AuthService : AuthService , private router : Router, private FormBuilder : FormBuilder) { }

  public formAuth: FormGroup = this.FormBuilder.group({

    email: ["", Validators.required],
    password: ["", Validators.required]
  })

  public submitForm(){
    if(this.formAuth.valid){
      this.AuthService.tentarLogar(this.formAuth.value.email, this.formAuth.value.password).subscribe({
        next:(rest) => {
          this.router.navigate(['/home']);
        },
        error:(error) => {
          console.log(this.mgError = error);
        }
      });

    }
  }
}
