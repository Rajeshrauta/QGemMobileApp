import { Injectable } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Injectable({
    providedIn: 'root'
  })

  
export class ScannerService {
    constructor() { }

    async startScan(){
        try{
            const result = await CapacitorBarcodeScanner.scanBarcode({
                hint : 17,  // for bar code its 17
                cameraDirection : 1, // rear camera    
            })
            console.log(result);
            return result.ScanResult;
        }
        catch(ex){
            throw(ex)
        }
    }
}