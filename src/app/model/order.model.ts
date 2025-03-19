export interface Order {
    estimateId: number;
    docNumber: number;
    items: Item[];
  }
  
  export interface Item {
    name: string;
    description : string;
    barcode: string;
    quantity: number;
    scannedQuantity: number;
    completed: boolean ;
  }