import { Routes } from '@angular/router';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { HomeComponent } from '@pages/base/home/home.component';
import { FeaturesComponent } from '@pages/base/features/features.component';
import { SignInComponent } from '@pages/auth/sign-in/sign-in.component';
import { ForgetPasswordComponent } from '@pages/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from '@pages/auth/reset-password/reset-password.component';
import { resetPasswordGuard } from '@core/guards/auth/reset-password.guard';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'home',
        redirectTo: '',
      },
      {
        path: '',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'features',
        component: FeaturesComponent,
        title: 'Features',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        title: 'Sign In',
      },
      {
        path: 'forgot-password',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
      {
        path: 'reset-password',
        // canActivate: [resetPasswordGuard],
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
];
