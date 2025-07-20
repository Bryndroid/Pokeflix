import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Authlayout } from './layouts/authlayout/authlayout';
import { Mainlayout } from './layouts/mainlayout/mainlayout';
export const routes: Routes = [
  {
    //Hago que cuando sea vacia la ruta, me ponga automaticamente la ruta registro
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'   // Importante para que coincida solo la ruta vacía exacta
  },
  {
    path: '',
    component: Mainlayout,
    children: [
      { path: 'Pokecasa', component: Home }
    ]
  },
  {
    path: '',
    component: Authlayout,
    children: [
      { path: 'registro', component: Login }
    ]
  },
  {
    path: '**',
    redirectTo: 'registro'
  }
];