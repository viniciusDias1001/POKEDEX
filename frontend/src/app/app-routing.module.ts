import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from '../app/components/auth/page/sign/sign.component';
import { LoginComponent } from '../app/components/auth/page/login/login.component';
import { HomeComponent } from '../app/components/auth/page/home/home.component';
import { BattleComponent } from '../app/components/auth/page/battle/battle.component';



const routes: Routes = [
  {path: '', redirectTo: '/sign', pathMatch: 'full'},
  { path: 'sign', component: SignComponent },
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'battle', component: BattleComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
