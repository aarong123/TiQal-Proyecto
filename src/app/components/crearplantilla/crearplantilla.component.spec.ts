import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearplantillaComponent } from './crearplantilla.component';

describe('CrearplantillaComponent', () => {
  let component: CrearplantillaComponent;
  let fixture: ComponentFixture<CrearplantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearplantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearplantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
