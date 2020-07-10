import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/igra-service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeInterstitial } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-odgovori',
  templateUrl: './odgovori.component.html',
  styleUrls: ['./odgovori.component.scss'],
})
export class OdgovoriComponent implements OnInit {

  constructor(public service: ServiceService,
    public router: Router,
    public route: ActivatedRoute,
    private admob: AdMobFree) { }

  ngOnInit() {
    // this.service.trenutniTim.odgovori.forEach(odgovor => {
    //   console.log(this.service.trenutniTim.listaTocnih.includes(odgovor));
    // })

    // izracunaj bodove
    let tocni = this.service.trenutniTim.tocnih;
    let netocni = this.service.trenutniTim.netocnih;
    
    this.service.trenutniTim.bodovi += tocni - netocni;
    if(this.service.trenutniTim.bodovi < 0)
      this.service.trenutniTim.bodovi = 0;
    
  }

  spremi() {
    let n = this.service.timoviFix.length;
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        if(this.service.timoviFix[j].bodovi < this.service.timoviFix[i].bodovi) {
          let temp = this.service.timoviFix[i];
          this.service.timoviFix[i] = this.service.timoviFix[j]
          this.service.timoviFix[j] = temp;
        }
      }
    }
    let igrac1 = this.service.trenutniTim.igrac1;
    let igrac2 = this.service.trenutniTim.igrac2;

    this.service.trenutniTim.igrac1 = igrac2;
    this.service.trenutniTim.igrac2 = igrac1;
    
    if(this.service.trenutniTim.bodovi >= this.service.points) {
      this.service.zavrsiGame = true;
    }
    
    document.addEventListener('onReceiveInterstitialAd', function() {
      console.log("da jest");
    });
    const adconfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-8163593086331416/9927036610',
      autoShow: true,
      isTesting: false
    }
    this.admob.interstitial.config(adconfig);
    this.admob.interstitial.prepare().then((s) => {
      console.log("prvi if: " + s);
      
    }).catch((e) => {
      console.log("drugi if");
      console.log(e);
    });

    

    this.router.navigate(['/rezultati/'], {relativeTo: this.route});
  }

  odustani() {

  }

  checkBox(event: any) {
    // console.log(event.detail.value);
    let odgovor = event.detail.value;
    // kada je odgovor na kraju tocan
    if(event.detail.checked) {
      this.service.trenutniTim.listaTocnih.push(odgovor);
      this.service.trenutniTim.tocnih++;
      this.service.trenutniTim.netocnih--;
    } else {
      this.service.trenutniTim.listaTocnih = this.ukloniOdgovor(odgovor);
      this.service.trenutniTim.tocnih--;
      this.service.trenutniTim.netocnih++;
    }
    
  }

  ukloniOdgovor(value: string) {
    return this.service.trenutniTim.listaTocnih.filter(data => {
      return data != value;
    });
  }

}
