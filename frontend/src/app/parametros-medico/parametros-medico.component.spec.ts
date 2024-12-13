import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosMedicoComponent } from './parametros-medico.component';

describe('ParametrosMedicoComponent', () => {
  let component: ParametrosMedicoComponent;
  let fixture: ComponentFixture<ParametrosMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametrosMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
