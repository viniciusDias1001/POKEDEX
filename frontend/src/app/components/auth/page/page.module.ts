import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BattleComponent } from './battle/battle.component';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  { path: 'sign', component: SignComponent },
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'battle', component: BattleComponent}

];

@NgModule({
  declarations: [
    SignComponent,
    LoginComponent,
    HomeComponent,
    BattleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [SignComponent, LoginComponent, HomeComponent, BattleComponent]
})
export class PageModule { }
