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
  IonIcon,
  IonTab,
  IonTabs,
  IonTabBar,
  IonTabButton,
  ToastController,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/floor-manager/order.service';
import { barcodeOutline, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Haptics } from '@capacitor/haptics';
import { Item, Order } from 'src/app/model/order.model';
import { FormsModule } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

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
    IonTab,
    IonTabs,
    IonTabButton,
    IonTabBar,
    FormsModule
  ]
})
export class OrderDetailPage implements OnInit {
  order?: Order;
  item: Item[] = [];
  public loading = false;
  private route: ActivatedRoute;

  constructor(
    route: ActivatedRoute,
    private orderService: OrderService,
    private alertController: AlertController,
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.route = route;  // Properly assign route    
    addIcons({ barcodeOutline, addCircleOutline, removeCircleOutline });
  }
  ngOnInit() {
    this.getParams();
    this.loadLocalData();
  }

  getParams() {
    const id = Number(this.route.snapshot.paramMap.get('docNumber')); // Convert to number
    this.order = this.orderService.getOrderDetail(id);
    this.item = this.order?.items.map(item => ({
      ...item,
      scannedQuantity: item.scannedQuantity || 0,
      completed: item.completed || false // Add completed flag
    })) || [];
  }

  get uncountedItems(): Item[] {
    return this.item.filter(item => !item.completed);
  }

  get countedItems(): Item[] {
    return this.item.filter(item => item.completed);
  }

  markAsCompleted(item: Item) {
    item.completed = true;
    this.saveLocalData();
  }

  removeFromCounted(item: Item) {
    item.completed = false;
    this.saveLocalData();
  }

  decreaseQty(item: Item) {
    if (item.scannedQuantity > 0) {
      item.scannedQuantity--;
      this.saveLocalData();
    }
  }

  increaseQty(item: Item) {
    if (item.scannedQuantity < item.quantity) {
      item.scannedQuantity++;
      this.saveLocalData();
    } else {
      this.presentToast(`Cannot add more than ${item.quantity} for ${item.name}.`);
    }
  }

  async loadLocalData() {
    try {
      const result = await Filesystem.readFile({
        path: `order-${this.order?.docNumber}.json`,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      const savedData = JSON.parse(result.data as string);
      this.item.forEach(item => {
        const savedItem = savedData.find((i: Item) => i.barcode === item.barcode);
        if (savedItem) {
          item.scannedQuantity = savedItem.scannedQuantity;
          item.completed = savedItem.completed || false;
        }
      });
    } catch (e) {
      console.log('No local data found or error reading file:', e);
    }
  }

  async saveLocalData() {
    try {
      await Filesystem.writeFile({
        path: `order-${this.order?.docNumber}.json`,
        data: JSON.stringify(this.item),
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      console.log('Scanned data saved locally');
    } catch (e) {
      console.error('Error saving local data:', e);
      this.showAlert('Error', 'Failed to save scanned data locally.');
    }
  }

  async startScan() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      const granted = await this.requestPermissions();
      await this.ensureGoogleBarcodeScannerModuleInstalled();
      if (!granted) {
        console.log('Camera permission denied');
        this.showAlert('Permission Required', 'Camera access is needed to scan barcodes. Please enable it in Settings > Apps > [Your App] > Permissions.');
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
      if (item.scannedQuantity < item.quantity) {
        item.scannedQuantity++;
        this.playFeedback();
        this.saveLocalData();
      } else {
        this.showAlert('Limit Reached', `Cannot scan more than ${item.quantity} for ${item.name}.`);
      }
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
    });

    await toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async ensureGoogleBarcodeScannerModuleInstalled() {
    try {
      const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (!available) {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
        console.log('Google Barcode Scanner Module installed.');
      } else {
        console.log('Google Barcode Scanner Module already available.');
      }
    } catch (error) {
      console.error('Error installing Google Barcode Scanner Module:', error);
      throw error;
    }
  }
}
