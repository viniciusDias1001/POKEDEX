import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { PageModule } from './components/auth/page/page.module'; // Import SignModule
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PageModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService],

  exports:[
    RouterModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
