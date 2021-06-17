import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { User } from './User';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { LoginGuard } from './login.guard';
import { HomeComponentComponent } from './home-component/home-component.component';


const mgtChildrenRoutes: Routes = [
  { path: 'exit', component: ExitComponentComponent },
  { path: 'product', component: ProductComponentComponent },
  { path: 'user', component: UserManagementComponentComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }

];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },

  {
    path: 'management',
    component: ManagementComponentComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    ExitComponentComponent,
    UserManagementComponentComponent,
    ProductComponentComponent,
    ManagementComponentComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, User, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
