import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivosPage } from './activos.page';

describe('ActivosPage', () => {
  let component: ActivosPage;
  let fixture: ComponentFixture<ActivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
