import {CanActivateFn, Router, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {inject} from "@angular/core";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'login', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent, canActivate: [isTokenExist]},
  {path: '**', component: NotFoundPageComponent},
];

function isTokenExist(): CanActivateFn {
  return () => {
    const isExist = localStorage.getItem('access_token') != null
    console.log(isExist);
    const router: Router = inject(Router);
    return isExist || router.createUrlTree(['login']);
  }
}
