import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/igra-service/service.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rezultati',
  templateUrl: './rezultati.component.html',
  styleUrls: ['./rezultati.component.scss'],
})
export class RezultatiComponent implements OnInit {

  constructor(public service: ServiceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    

    this.service.trenutniTim.tocnih = 0;
    this.service.trenutniTim.netocnih = 0;
    this.service.trenutniTim.listaTocnih = [];
    this.service.trenutniTim.odgovori = [];

    this.service.trenutniTim = this.service.timovi[this.service.counter];
  }

  nastavi() {
    
    this.router.navigate(['/igra-play/'], {relativeTo: this.route});
  }

   

  zavrsi() {
    this.odustani();
  }

  odustani() {
    this.service.reload();
    this.router.navigate(['/home/'], {relativeTo: this.route});
  }


}
