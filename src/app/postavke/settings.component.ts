import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../igra-service/service.service';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  
  constructor(public service: ServiceService, 
    private storage: Storage, 
    public app: AppVersion,
    public email: EmailComposer,
    private platform: Platform) {

      // ne radi=????????
      // this.app.getVersionNumber().then(function(vers) {
      //   console.log(vers);
      //   this.versionR = vers;
      // }).catch(err => {
      //   this.versionR = err;
      // });
     }

  public versionR: string = "0";
  public dostupno: boolean;

  ngOnInit() {
   
    this.email.isAvailable().then((ava: boolean) => {
      this.dostupno = ava;
    });
  }

  change(event: any) {
    let value = event.detail.value;
    this.service.points = value;
    this.storage.set('bodovi', value);
  }

  changeTime(event: any) {
    let time = event.detail.value;
    this.service.time = time;
    this.storage.set('vrijeme', time);
  }

  mail() {
    if(this.dostupno) {
      let email = {
        to: 'stipess@youplayandroid.com',
        subject: 'Support for Alias',
        isHtml: true
      }

      this.email.open(email);
    }
  }

}
