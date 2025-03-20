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
      customerName : "Robert house",
      itemCount: 2,
      assignTime: new Date(), 
      items: [
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'A1L1', expiryDate : new Date(),barcode: '8902519500700', quantity: 5, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'C1L2', expiryDate : new Date(), barcode: '8902519500700', quantity: 9, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'Y2L3', expiryDate : new Date(), barcode: '8902519500700', quantity: 6, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'U2L2', expiryDate : new Date(), barcode: '8902519500700', quantity: 23, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'M5L4', expiryDate : new Date(), barcode: '8902519500700', quantity: 33, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'X6L5', expiryDate : new Date(), barcode: '8902519500700', quantity: 9, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'N5L2', expiryDate : new Date(), barcode: '8902519500700', quantity: 100, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'N4L2', expiryDate : new Date(), barcode: '8902519500700', quantity: 54, scannedQuantity: 0, completed: false },
        { name: 'KLGCP', description : 'KLG Calcutti Paan 12 ins*4(14pcs) (1 Baby carton out of 2 in the master case)', location: 'G3L3', expiryDate : new Date(), barcode: '8902519500700', quantity: 4, scannedQuantity: 0, completed: false },
        { name: 'GRBGPB5', description : 'GRB Pure Brown Ghee(Buffalo) Jar 500ml*24', location: 'K1L3', expiryDate : new Date(), barcode: '8902519500702', quantity: 3, scannedQuantity: 0, completed: false}
      ]
    },
    {
      estimateId: 2,
      docNumber: 10002,
      customerName : "Sai Complex",
      itemCount: 1,
      assignTime: new Date(), 
      items: [
        { name: 'MRFO', description: 'Mothers Recipe Fried Onion 100g*24', location: 'O1L5', expiryDate : new Date(), barcode: '8902519500700', quantity: 2, scannedQuantity: 0, completed: false }
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
