import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
  })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  // public GetOrderHistoryList(gridState: any) {
  //   const strUrl = `${environment.apiUrl}/api/Orders/OrderHistory?${toDataSourceRequestString(gridState)}`;
  //   return this.http.get(strUrl, httpOptions);
  // }

  getOrderDetail(estimateId: number){
    const strUrl = `${environment.apiUrl}/api/WarehouseOrder/GetOrderItemDetail?estimateId=${estimateId}`;
    return this.http.get(strUrl, httpOptions);
  }

  public GetOrderHistoryList(associateId: string) {
    associateId = "587fea69-347c-4b05-9ffd-af64710f3ee9";
    const strUrl = `${environment.apiUrl}/api/WarehouseOrder/GetOrders?associateId=${associateId}`;
    return this.http.get(strUrl, httpOptions);
  }
}
