import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Order, Item } from '../../model/order.model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor() { }

  // public GetOrderHistoryList(gridState: any) {
  //   const strUrl = `${environment.apiUrl}/api/Orders/OrderHistory?${toDataSourceRequestString(gridState)}`;
  //   return this.http.get(strUrl, httpOptions);
  // }

  private orders: Order[] = [
    {
      estimateId: 1,
      docNumber: 10001,
      items: [
        { name: 'frozen paratha', description : 'frozen paratha', barcode: '8902519500700', quantity: 5, scannedQuantity: 0, completed: false },
        { name: 'Laddu', description : 'Haldiram Laddu', barcode: '67890', quantity: 3, scannedQuantity: 0, completed: false}
      ]
    },
    {
      estimateId: 2,
      docNumber: 10002,
      items: [
        { name: 'Ice tea', description: 'Ice tea', barcode: '8902519500700', quantity: 2, scannedQuantity: 0, completed: false }
      ]
    }
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  uploadScannedData(orderId: string, items: Item[]): Promise<any> {
    console.log(`Uploaded order ${orderId}:`, items);
    return Promise.resolve({ success: true }); // Mock upload
  }

  getOrderDetail(docNumber: number) : Order | undefined{
    var item = this.orders.find(i => i.docNumber === docNumber);
    return item;
  }
}
