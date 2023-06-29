import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}
  login() {
    // Verificar si el usuario y la clave son correctos
    if (this.username === 'rama' && this.password === 'rama') {
      // Guardar la información en el localStorage
      localStorage.setItem('username', this.username);

      // Asignar el nombre de usuario a la variable local
      this.username = this.username;

      // Redirigir a la página deseada
      this.router.navigateByUrl('/folder/Inbox').then(() => {
        window.location.reload();
      });
    } else {
      // Mostrar algún mensaje de error o realizar alguna acción adicional si el inicio de sesión falla
    }
  }
}
