import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../igra-service/service.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public service: ServiceService, public storage: Storage, public platform: Platform) { 
    
  }

  ngOnInit() {
    
    this.storage.get('vrijeme').then((val) => {
      if(val == null) {
        this.storage.set('vrijeme', 60);
        this.service.time = 60;
      } else {
        this.service.time = val;
      }
    });

    this.storage.get('bodovi').then((val) => {
      if(val == null) {
        this.storage.set('bodovi', 60);
        this.service.points = 60;
      } else {
        this.service.points = val;
      }
    });
  }

 

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      document.removeEventListener('backbutton', function(e) {
          
      });
    });

    this.service.reload();
  }

}
