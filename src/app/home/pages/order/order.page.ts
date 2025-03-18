import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonLabel, IonText, IonToolbar, IonList, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { OrderService } from 'src/app/services/floor-manager/order.service';

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
    RouterLink,
    CommonModule]
})
export class OrderPage implements OnInit {

  items: any[] = []
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.items = this.orderService.getOrders();
  }

}
