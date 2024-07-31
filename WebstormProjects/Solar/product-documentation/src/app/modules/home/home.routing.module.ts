import { RouterModule, Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { languagesResolver } from './resolvers';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      languages: languagesResolver,
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
