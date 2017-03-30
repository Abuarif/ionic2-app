import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    console.log('Online');
    if(this.onDevice && Network.onConnect){
      return Network.onConnect !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    console.log('Offline');
    if(this.onDevice && Network.onConnect){
      return Network.onConnect === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }
}