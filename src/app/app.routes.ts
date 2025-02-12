import { Routes } from '@angular/router';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { HomeComponent } from '@pages/base/home/home.component';
import { FeaturesComponent } from '@pages/base/features/features.component';
import { SignInComponent } from '@pages/auth/sign-in/sign-in.component';
import { ForgetPasswordComponent } from '@pages/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from '@pages/auth/reset-password/reset-password.component';
import { resetPasswordGuard } from '@core/guards/reset-password.guard';
import { HomeComponent as DashboardHomeComponent } from '@pages/dashboard/home/home.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { dashboardGuard } from '@core/guards/dashboard.guard';
import { IndexComponent as StreetDataIndexComponent } from '@pages/dashboard/street-data/index/index.component';
import { NotificationsComponent } from '@pages/dashboard/notifications/notifications.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { authGuard } from '@core/guards/auth.guard';
import { ViewComponent as StreetDataViewComponent } from '@pages/dashboard/street-data/view/view.component';
import { EditComponent as StreetDataEditComponent } from '@pages/dashboard/street-data/edit/edit.component';
import { NewComponent as StreetDataNewComponent } from '@pages/dashboard/street-data/new/new.component';
import { newStreetDataFormGuard } from '@core/guards/new-street-data-form.guard';
import { IndexComponent as ExternalListingsIndexComponent } from '@pages/dashboard/external-listings/index/index.component';
import { NewComponent as ExternalListingsNewComponent } from '@pages/dashboard/external-listings/new/new.component';
import { ViewComponent as ExternalListingsViewComponent } from '@pages/dashboard/external-listings/view/view.component';
import { EditComponent as ExternalListingEditComponent } from '@pages/dashboard/external-listings/edit/edit.component';
import { IndexComponent as ListingAgentsIndexComponent } from '@pages/dashboard/external-listings/agents/index/index.component';

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
    component: AuthLayoutComponent,
    canActivate: [authGuard],
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
        canActivate: [resetPasswordGuard],
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component').then(
        (c) => c.DashboardLayoutComponent
      ),
    children: [
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        component: DashboardHomeComponent,
        title: 'Home',
      },

      // Street Data Routes
      {
        path: 'street-data',
        component: StreetDataIndexComponent,
        title: 'Street Data',
      },
      {
        path: 'street-data/new',
        canActivate: [newStreetDataFormGuard],
        component: StreetDataNewComponent,
        title: 'Create Street Data',
      },
      {
        path: 'street-data/:id',
        component: StreetDataViewComponent,
        title: 'View Street Data',
      },
      {
        path: 'street-data/edit/:id',
        component: StreetDataEditComponent,
        title: 'Edit Street Data',
      },
      // External Listings Routes
      {
        path: 'external-listings',
        component: ExternalListingsIndexComponent,
        title: 'External Listings',
      },
      {
        path: 'external-listings/new',
        component: ExternalListingsNewComponent,
        title: 'Create External Listing',
      },
      {
        path: 'external-listings/agents',
        component: ListingAgentsIndexComponent,
        title: 'View Listing Agents',
      },
      {
        path: 'external-listings/:id',
        component: ExternalListingsViewComponent,
        title: 'View External Listing',
      },
      {
        path: 'external-listings/edit/:id',
        component: ExternalListingEditComponent,
        title: 'Edit External Listing',
      },

      // Notification Route
      {
        path: 'notifications',
        component: NotificationsComponent,
        title: 'Notifications',
      },
    ],
  },
  {
    title: 'Not Found',
    path: '**',
    component: NotFoundComponent,
  },
];
