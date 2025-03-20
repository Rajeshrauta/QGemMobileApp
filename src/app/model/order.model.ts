export interface Order {
    estimateId: number;
    docNumber: number;
    customerName : string;
    itemCount : number;
    assignTime: Date;
    items: Item[];
  }
  
  export interface Item {
    name: string;
    description : string;
    location : string;
    expiryDate : Date;
    barcode: string;
    quantity: number;
    scannedQuantity: number;
    completed: boolean ;
  }