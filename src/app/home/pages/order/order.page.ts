import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonLabel, IonText, IonToolbar, IonList, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { OrderService } from 'src/app/services/floor-manager/order.service';
import { exitOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonLabel,
    IonText,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    RouterLink,
    CommonModule]
})
export class OrderPage implements OnInit {

  items: any[] = []
  constructor(
    private orderService: OrderService,
    private alertCtrl: AlertController, 
    private router: Router
  ) { 
    addIcons({ exitOutline });
  }

  ngOnInit() {
    this.items = this.orderService.getOrders();
  }

  async confirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    // Clear user data (if needed)
    this.router.navigate(['/login']); // Redirect to login page
  }
}
