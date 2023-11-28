import { Routes } from '@angular/router';
import { ListComponent} from "./views/list/list.component";
import {CreateComponent} from "./views/create/create.component";

export const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path:'editar/:id', component: CreateComponent
  },
  {
    path: 'criar', component: CreateComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];
