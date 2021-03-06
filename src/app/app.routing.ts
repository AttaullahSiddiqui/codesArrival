import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './error/404.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/menu/menu.module#MenuModule'
      }]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  { path: '**', component: P404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
