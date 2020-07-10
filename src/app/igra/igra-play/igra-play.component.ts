import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/igra-service/service.service';
import { Tim } from '../model/tim';
import { AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-igra-play',
  templateUrl: './igra-play.component.html',
  styleUrls: ['./igra-play.component.scss'],
})
export class IgraPlayComponent implements OnInit {

  constructor(public service: ServiceService,
              public alertController: AlertController,
              private router: Router,
              private route: ActivatedRoute,
              private platform: Platform,
              private audio: NativeAudio,
              private translate: TranslateService) { }

  public time: number;
  private random: number;
  private pauziraj: boolean;
  private interval: number;
  private igraUTijeku: boolean;

  private header: string;
  private objasnjava: string;
  private pogada: string;
  private btnText: string;
  

  ngOnInit() {
    this.platform.ready().then(() => {
      this.platform.pause.subscribe(async () => {
        if(!this.pauziraj)
          this.zaustaviInfo();
      });
    });

    this.audio.preloadSimple('success', 'assets/audio/success.mp3');
    this.audio.preloadSimple('error', 'assets/audio/error.mp3');
    this.audio.preloadSimple('end', 'assets/audio/end.mp3');

    this.translate.get('GAME').subscribe((res: string) => {
      this.btnText = res['continue'];
      this.header = res['gamePause'];
      this.objasnjava = res['explaining'];
      this.pogada = res['guessing'];
      console.log(res);
    });
  }

  ionViewWillEnter() {
    this.zaustaviInfo();
    console.log("usao sam kao car");
  }

  async zaustaviInfo() {
    this.pauziraj = true;
    const alert = await this.alertController.create({
      header: this.header,
      subHeader: this.objasnjava+': ' + this.service.trenutniTim.igrac1+" " + this.pogada + ' : ' + this.service.trenutniTim.igrac2,
      buttons: [{
        text: this.btnText,
        handler: () => {
          this.pauziraj = false;
          this.igraUTijeku = true;
        }
      }]
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      this.pauziraj = false;
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("dali se ovo ugasilo?");
        }, false);
      });
    });

    this.time = this.service.time;
    this.postaviTimer();
  }

  ionViewWillLeave() {
    this.pauziraj = true;
    
  }

  postaviTimer() {
    let _this = this;
    this.interval = setInterval(function() {
      _this.smanjiTimer();
      
    }, 1000);
  }

  smanjiTimer() {
    if(this.time > -1 && !this.pauziraj)
      this.time--;

    if(this.time == -1) {
      this.audio.play("end");
      this.pauziraj = true;
      this.igraUTijeku = false;
      clearInterval(this.interval);
      this.service.counter++;
      if(this.service.counter > this.service.timovi.length-1)
        this.service.counter = 0;

      
      this.time = this.service.time;
      this.router.navigate(['/odgovori/'], {relativeTo: this.route});
      this.service.randomRijec();
      this.service.trenutniTim.odgovori.forEach(data =>{
        console.log(data);
      });
      
    }
  }

  tocno() {
    console.log("tocno");
    this.audio.play('success');
    this.service.trenutniTim.tocnih++;
    this.service.trenutniTim.odgovori.push(this.service.trenutnaRijec);
    this.service.trenutniTim.listaTocnih.push(this.service.trenutnaRijec);
    this.service.randomRijec();
  }

  netocno() {
    this.audio.play('error');
    this.service.trenutniTim.netocnih++;
    this.service.trenutniTim.odgovori.push(this.service.trenutnaRijec); 
    this.service.randomRijec();
  }

}
