import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdgovoriComponent } from './odgovori.component';

describe('OdgovoriComponent', () => {
  let component: OdgovoriComponent;
  let fixture: ComponentFixture<OdgovoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdgovoriComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdgovoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
