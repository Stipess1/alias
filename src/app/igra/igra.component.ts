import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../igra-service/service.service';
import { Tim } from './model/tim';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-igra',
  templateUrl: './igra.component.html',
  styleUrls: ['./igra.component.scss'],
})
export class IgraComponent implements OnInit {

  public counter: number = 0;
  private toastLang: string;
  private toastPlayer: string;
  private startPlay: string;
  public cantPlay: boolean = true;

  constructor(public service: ServiceService,
              public toastController: ToastController,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit() {
    this.service.timovi = [];
    this.service.preGame = [];

    this.translate.get('GAME').subscribe( res => {
      this.toastLang = res['chooseLang'];
      this.toastPlayer = res['enterPName'];
      this.startPlay = res['canPlay'];
    });
  }

  newTeam() {
    this.counter++;
    let tim = new Tim(this.counter);

    
    this.service.timovi.push(tim);
    this.service.timoviFix.push(tim);
    this.service.preGame.push(this.counter);
    if(this.service.timovi.length > 1) {
      this.cantPlay = false;
    }
  }

  start() {
    console.log("aa");
    
    if(this.cantPlay) {
      this.canStartPlay();
      return;
    }

    let isEmpty = true;
    for(let i = 0; i < this.service.timovi.length; i++) {
      if(this.service.timovi[i].igrac1.length > 0 && this.service.timovi[i].igrac2.length > 0) {
        isEmpty = false;
      } else {
        isEmpty = true;
      }
    }
    if(isEmpty) {
      this.presentToast();
    } else if(this.service.language == null)  {
      this.izaberiJezikToast();
    } else {
      this.service.shuffleArray();
      this.service.trenutniTim = this.service.timovi[this.service.counter];
      this.service.randomRijec();

      this.router.navigate(['/igra-play/'], {relativeTo: this.route});
    }
  }

  languageChange(event: any) {
    let lang = event.detail.value;
    console.log(lang);
    this.service.language = lang;
    if(lang == "english") {
      this.service.rijeci = this.service.engRijeci;
    } else {
      this.service.rijeci = this.service.hrRijeci;
    }
  }

  async canStartPlay() {
    const toast = await this.toastController.create({
      message: this.startPlay,
      duration: 2000
    });
    toast.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.toastPlayer,
      duration: 2000
    });
    toast.present();
  }

  async izaberiJezikToast() {
    const toast = await this.toastController.create({
      message: this.toastLang,
      duration: 2000
    });
    toast.present();
  }

  changed(igrac: number, item: Tim, event: any) {
    if(igrac == 1) {
      item.igrac1 = event.detail.value;
      // this.service.timovi.find(item).igrac1 = item.igrac1;
    } else {
      item.igrac2 = event.detail.value;
      // this.service.timovi.find(item).igrac2 = item.igrac2;
    }
  }

  removeTeam(tim: Tim) {
    let index = this.service.timovi.indexOf(tim);
    this.service.timovi.splice(index, 1);

    let index1 = this.service.timoviFix.indexOf(tim);
    this.service.timoviFix.splice(index1, 1);
    if(this.service.timovi.length < 2)
      this.cantPlay = true;
  }

}
