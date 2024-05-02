import { Router } from '@angular/router';
import { AuthService } from './../../../../auth.service';
import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  Usuario: Usuario = new Usuario();

  public formAuth: FormGroup = this.FormBuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required]
  })


  constructor(private AuthService : AuthService , private router : Router, private FormBuilder : FormBuilder) {


   }

  ngOnInit(): void {
  }


  public submitForm(){
    if(this.formAuth.valid){
      this.Usuario = this.formAuth.value;
      this.AuthService.salvar(this.Usuario).subscribe({
        next:(rest) => rest,
        error:(error) => error
      });
    }
  }

}
