import { Routes } from '@angular/router';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { HomeComponent } from '@pages/base/home/home.component';
import { AboutComponent } from '@pages/base/about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                title: 'Home'
            },
            {
                path: 'about',
                component: AboutComponent,
                title: 'About'
            },
        ]
    }
];
