import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './components/language/language.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ':language',
    component: LanguageComponent,
    children: [
      {
        path: 'documentation',
        loadChildren: () => import('./modules/documentation/documentation.module').then((m) => m.DocumentationModule),
      },
      {
        path: '',
        redirectTo: 'documentation',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
