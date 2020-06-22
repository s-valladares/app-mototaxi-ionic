import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PViajesPage } from './p-viajes.page';

describe('PViajesPage', () => {
  let component: PViajesPage;
  let fixture: ComponentFixture<PViajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PViajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
