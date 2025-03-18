import { Component } from '@angular/core';
import { IonTabs} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, cartSharp } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonTabs],
})
export class HomePage {

  constructor() {
      addIcons({ triangle, ellipse, square, cartSharp });
    }
}
