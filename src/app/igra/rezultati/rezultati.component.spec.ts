import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RezultatiComponent } from './rezultati.component';

describe('RezultatiComponent', () => {
  let component: RezultatiComponent;
  let fixture: ComponentFixture<RezultatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezultatiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RezultatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
