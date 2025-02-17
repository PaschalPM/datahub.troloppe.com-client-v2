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
import { NewComponent as ListingAgentsNewComponent } from '@pages/dashboard/external-listings/agents/new/new.component';
import { ShowComponent as ListingAgentShowComponent } from '@pages/dashboard/external-listings/agents/show/show.component';
import { EditComponent as ListingAgentsEditComponent } from '@pages/dashboard/external-listings/agents/edit/edit.component';
import { editAgentsGuard } from '@core/guards/edit-agents.guard';

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
        title: 'Street Data',
      },
      {
        path: 'street-data/:id/edit',
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
      // LISTING AGENTS -- START
      {
        path: 'external-listings/agents',
        component: ListingAgentsIndexComponent,
        title: 'Listing Agents',
      },
      {
        canActivate: [editAgentsGuard],
        path: 'external-listings/agents/:id/edit',
        component: ListingAgentsEditComponent,
        title: 'Edit Listing Agent',
      },
      {
        path: 'external-listings/agents/:id',
        component: ListingAgentShowComponent,
        title: 'Listing Agent',
      },
      // LISTING AGENTS -- END
      {
        path: 'external-listings/:id',
        component: ExternalListingsViewComponent,
        title: 'External Listing',
      },
      {
        path: 'external-listings/:id/edit',
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
