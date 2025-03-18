import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput,IonCol, IonGrid,IonRow, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    CommonModule,
    FormsModule]
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    // Add your authentication logic here (e.g., API call)
    if (this.username && this.password) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
