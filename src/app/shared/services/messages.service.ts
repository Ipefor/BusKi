import { inject, Injectable } from '@angular/core';
import { Message } from 'src/app/core/models/message.interface';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private mensajesDB!: AngularFireList<Message>;
  private readonly db = inject(AngularFireDatabase);
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private locationString!: string;
  private userName!: string;
  private readonly apiKey = '976da340bf684434b6bb624345af2ef0';
  private latitude?: string;
  private longitude?: string;

  constructor() {
    this.mensajesDB = this.db.list('/messages', (ref) =>
      ref.orderByChild('date'),
    );
    Geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude.toString();
      this.longitude = position.coords.longitude.toString();
      this.getCityFromCoordinates(this.latitude, this.longitude).subscribe(
        (city) => {
          this.locationString = city;
        },
      );
    });
  }

  addMessage(text: string) {
    this.mensajesDB.push({
      user: window.localStorage.getItem('user_name') || 'Usuario desconocido',
      date: new Date().toDateString(),
      text: text,
      location: this.locationString,
    });
  }

  getMensajes(): Observable<Message[]> {
    return this.mensajesDB.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => this.getUserFromPayload(c.payload));
      }),
    );
  }

  getUserFromPayload(payload: any): Message {
    const message = {
      ...payload.val(),
      $key: payload.key,
    };
    return message;
  }

  deleteMessages(): void {
    this.mensajesDB.remove();
  }

  private getCityFromCoordinates(lat: string, lon: string): Observable<string> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.results && response.results.length > 0) {
          const components = response.results[0].components;
          if (components.city) {
            return components.city;
          } else if (components.town) {
            return components.town;
          } else if (components.village) {
            return components.village;
          }
        }
        return 'Ubicación desconocida';
      }),
    );
  }
}
