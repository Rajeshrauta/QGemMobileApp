import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonText,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonBackButton,
  IonInput,
  IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/floor-manager/order.service';
import { barcodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Haptics } from '@capacitor/haptics';
import { Item, Order } from 'src/app/model/order.model';
import { FormsModule } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonFooter,
    IonTitle,
    IonText,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonBackButton,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class OrderDetailPage implements OnInit {
  order?: Order ;
  item: Item[] = [];
  public loading = false;
  private route: ActivatedRoute;

  constructor(route: ActivatedRoute, private orderService: OrderService, private alertController: AlertController, private platform: Platform) {
    this.route = route;  // Properly assign route    
    addIcons({ barcodeOutline });
  }
  ngOnInit() {
    this.getParams();
  }

  getParams() {
    const id = Number(this.route.snapshot.paramMap.get('docNumber')); // Convert to number
    this.order = this.orderService.getOrderDetail(id);
    this.item = this.order?.items || [];
  }


  decreaseQty(item: any) {
    if (item.scannedQuantity > 0) {
      item.scannedQuantity--;
    }
  }

  increaseQty(item: any) {
    item.scannedQuantity++;
  }

  async startScan() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      const granted = await this.requestPermissions();
      if (!granted) {
        console.log('Camera permission denied');
        await this.showPermissionDeniedAlert();
        return;
      }
      const result = await BarcodeScanner.scan();
      if (result.barcodes.length > 0) {
        const scannedCode = result.barcodes[0].rawValue;
        this.handleScan(scannedCode);
      }
    }
    else {
      console.log('Barcode scanning is not supported on the web.');
      await this.showAlert('Not Supported', 'Barcode scanning is only available on mobile devices.');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted';
  }

  handleScan(barcode: string) {
    let item = (this.item).find(i => i.barcode === barcode);
    if (item) {
      item.scannedQuantity++;
      this.playFeedback();
    } else {
      console.log('Item not found');
      this.showAlert('Not Found', 'No item matches this barcode.');
    }
  }

  async playFeedback() {
    await Haptics.vibrate();
    const audio = new Audio('assets/beep.mp3');
    audio.play();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showPermissionDeniedAlert() {
    const alert = await this.alertController.create({
      header: 'Permission Required',
      message: 'Camera access is needed to scan barcodes. Please enable it in Settings > Apps > [Your App] > Permissions.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
