import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonLabel,
  IonList, IonItem, IonButton, IonBackButton
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonText,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonBackButton,
    CommonModule,
  ]
})
export class OrderDetailPage implements OnInit {
  item: any = {};
  items: any[] = [
    {
      estimateId: 1,
      docNumber: 10001,
      customerName: 'Test Customer 1',
      itemCount: 12,
      itemDetail: [
        {
          itemId: 1,
          itemName: "Test",
          description: "Test Description",
          quantity: 6
        },
        {
          itemId: 2,
          itemName: "Bhujia",
          description: "Haldiram Bhujia",
          quantity: 3
        },
        {
          itemId: 3,
          itemName: "Frozen Roti",
          description: "Haldiram Frozen Roti",
          quantity: 3
        }
      ]
    },
    {
      estimateId: 2,
      docNumber: 10002,
      customerName: 'Test Customer 2',
      itemCount: 8,
      itemDetail: [
        {
          itemId: 4,
          itemName: "Milk",
          description: "Amul fresh milk",
          quantity: 6
        },
        {
          itemId: 5,
          itemName: "Papad",
          description: "Lijat Papad",
          quantity: 3
        },
        {
          itemId: 6,
          itemName: "Lasi",
          description: "Amul Lasi",
          quantity: 3
        }
      ],
    },
    {
      estimateId: 3,
      docNumber: 10003,
      customerName: 'Test Customer 3',
      itemCount: 5,
      itemDetail: [],
    },
    {
      estimateId: 4,
      docNumber: 10004,
      customerName: 'Test Customer 4',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 5,
      docNumber: 10005,
      customerName: 'Test Customer 5',
      itemCount: 7,
      itemDetail: [],
    },
    {
      estimateId: 6,
      docNumber: 10006,
      customerName: 'Test Customer 6',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 7,
      docNumber: 10007,
      customerName: 'Test Customer 7',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 8,
      docNumber: 10008,
      customerName: 'Test Customer 8',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 9,
      docNumber: 10009,
      customerName: 'Test Customer 9',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 10,
      docNumber: 10010,
      customerName: 'Test Customer 10',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 11,
      docNumber: 10011,
      customerName: 'Test Customer 11',
      itemCount: 2,
      itemDetail: [],
    },
    {
      estimateId: 12,
      docNumber: 10012,
      customerName: 'Test Customer 12',
      itemCount: 12,
      itemDetail: [],
    },
    {
      estimateId: 13,
      docNumber: 10013,
      customerName: 'Test Customer 13',
      itemCount: 12,
      itemDetail: [],
    }
  ]

  private route: ActivatedRoute;

  constructor(route: ActivatedRoute) {
    this.route = route;  // Properly assign route
  }
  ngOnInit() {
    this.getParams();
  }

  getParams() {
    const id = Number(this.route.snapshot.paramMap.get('docNumber')); // Convert to number
    this.item = this.items.find(i => i.docNumber === id) || {}; 

    console.log(this.item);
  }
}
