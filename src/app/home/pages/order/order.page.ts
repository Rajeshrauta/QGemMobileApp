import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonLabel, IonText, IonToolbar, IonList, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

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

  items: any[] = [
    {
      estimateId: 1,
      docNumber: 10001,
      customerName: 'Test Customer 1',
      itemCount: 12,
    },
    {
      estimateId: 2,
      docNumber: 10002,
      customerName: 'Test Customer 2',
      itemCount: 8,
    },
    {
      estimateId: 3,
      docNumber: 10003,
      customerName: 'Test Customer 3',
      itemCount: 5,
    },
    {
      estimateId: 4,
      docNumber: 10004,
      customerName: 'Test Customer 4',
      itemCount: 12,
    },
    {
      estimateId: 5,
      docNumber: 10005,
      customerName: 'Test Customer 5',
      itemCount: 7,
    },
    {
      estimateId: 6,
      docNumber: 10006,
      customerName: 'Test Customer 6',
      itemCount: 12,
    },
    {
      estimateId: 7,
      docNumber: 10007,
      customerName: 'Test Customer 7',
      itemCount: 12,
    },
    {
      estimateId: 8,
      docNumber: 10008,
      customerName: 'Test Customer 8',
      itemCount: 12,
    },
    {
      estimateId: 9,
      docNumber: 10009,
      customerName: 'Test Customer 9',
      itemCount: 12,
    },
    {
      estimateId: 10,
      docNumber: 10010,
      customerName: 'Test Customer 10',
      itemCount: 12,
    },
    {
      estimateId: 11,
      docNumber: 10011,
      customerName: 'Test Customer 11',
      itemCount: 2,
    },
    {
      estimateId: 12,
      docNumber: 10012,
      customerName: 'Test Customer 12',
      itemCount: 12,
    },
    {
      estimateId: 13,
      docNumber: 10013,
      customerName: 'Test Customer 13',
      itemCount: 12,
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
