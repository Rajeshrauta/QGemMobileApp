export interface Order {
  AssignedTime: Date;
  EstimateId: number;
  DocNumber: number;
  CustomerId: number;
  CustomerName : string;
  AssociateId : string;
  DistinctItemCount : number;
  }
  
  export interface Item {
    ItemId: number;
    ItemName: string;
    Description : string;
    Location : string;
    ExpiryDate : Date;
    Quantity: number;
    barcode: string;
    scannedQuantity: number;
    completed: boolean ;
  }