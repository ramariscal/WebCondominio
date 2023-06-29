import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentRoute: string = '';
  usuario: string | null;

  public appPages = [
    {
      title: 'Personal',
      url: '/personas',
      icon: 'person',
      children: [
        { title: 'Empleados', url: '/personas/empleados', icon: 'people' },
        { title: 'Residentes', url: '/personas/residente', icon: 'person' }
      ],
      expanded: false
    },
    {
      title: 'Ingresos',
      url: '/ingresos',
      icon: 'log-in',
      children: [
        { title: 'Vehículos', url: '/ingresos/vehiculo', icon: 'car' },
        { title: 'Paqueterías', url: '/ingresos/paqueteria', icon: 'cube' },
        { title: 'Visitas', url: '/ingresos/visitas', icon: 'people' }
      ],
      expanded: false
    },
    {
      title: 'Administración',
      url: '/administracion',
      icon: 'briefcase',
      children: [
        { title: 'Gestión', url: '/administracion/gestion', icon: 'save' },
        { title: 'Multas', url: '/administracion/allinsformes', icon: 'document' }
      ],
      expanded: false
    }
  ];

  constructor(private router: Router) {
    this.usuario = localStorage.getItem('usuario');
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        this.currentRoute = currentRoute;
      }
    });
  }
  logout() {
    // Limpia el almacenamiento local
    localStorage.clear();
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  redirectToInbox() {
    this.router.navigate(['/folder/inbox']);
  }
  
}
