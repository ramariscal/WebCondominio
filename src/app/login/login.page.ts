import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  usuario: string = '';
  clave: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  login() {
    // Realizar la llamada a la API para autenticar al usuario
    this.apiService.authenticate(this.usuario, this.clave).subscribe(
      (response) => {
        // Verificar si la autenticación fue exitosa
        if (response.authenticated) {
          // Guardar la información en el localStorage
          localStorage.setItem('usuario', this.usuario);

          // Redirigir a la página deseada
          this.router.navigateByUrl('/folder/Inbox').then(() => {
            window.location.reload()
          });
        } else {
          // Mostrar alerta de credenciales incorrectas
          this.presentAlert('Credenciales incorrectas');
        }
      },
      (error) => {
        // Manejar el error de la llamada a la API
        console.error(error);
      }
    );
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
