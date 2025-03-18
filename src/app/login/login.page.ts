import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule]
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController, private platform : Platform ) { }

  async login() {
    if (!this.username || !this.password) {
      await this.showAlert('Validation Error', 'Please enter both username and password.');
      return;
    }
    // Add your authentication logic here (e.g., API call)
    if (this.username && this.password) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      try {
        StatusBar.setOverlaysWebView({ overlay: false }); // Prevent overlay
      } catch (error) {
        console.error('StatusBar configuration error:', error);
      }
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
