import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'personas',
    children: [
      {
        path: '',
        redirectTo: 'empleados',
        pathMatch: 'full'
      },
      {
        path: 'empleados',
        loadChildren: () => import('./personas/empleados/empleados.module').then(m => m.EmpleadosPageModule)
      },
      {
        path: 'residente',
        loadChildren: () => import('./personas/residente/residente.module').then(m => m.ResidentePageModule)
      },
    ]
  },
  {
    path: 'ingresos',
    children: [
      {
        path: '',
        redirectTo: 'vehiculo',
        pathMatch: 'full'
      },
      {
        path: 'vehiculo',
        loadChildren: () => import('./ingresos/vehiculo/vehiculo.module').then(m => m.VehiculoPageModule)
      },
      {
        path: 'paqueteria',
        loadChildren: () => import('./ingresos/paqueteria/paqueteria.module').then(m => m.PaqueteriaPageModule)
      },
      {
        path: 'visitas',
        loadChildren: () => import('./ingresos/visitas/visitas.module').then(m => m.VisitasPageModule)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'administracion',
    children: [
      {
        path: '',
        redirectTo: 'gestion',
        pathMatch: 'full'
      },
      {
        path: 'gestion',
        loadChildren: () => import('./administracion/gestion/informes.module').then(m => m.InformesPageModule)
      },
      {
        path: 'allinsformes',
        loadChildren: () => import('./administracion/allinsformes/allinsformes.module').then( m => m.AllinsformesPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
