import { Routes } from '@angular/router';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { HomeComponent } from '@pages/base/home/home.component';
import { FeaturesComponent } from '@pages/base/features/features.component';

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
        data: {
          animationState: 'HomePage',
        },
      },
      {
        path: 'features',
        component: FeaturesComponent,
        title: 'Features',
        data: {
          animationState: 'FeaturesPage',
        },
      },
    ],
  },
];
