import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      {
        path: '',
        redirectTo: 'application/list',
        pathMatch: 'full',
      },
      {
        path: 'application',
        loadChildren: () =>
          import('./modules/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedRoutingModule {}
