import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafiComponent } from './grafi.component';

describe('GrafiComponent', () => {
  let component: GrafiComponent;
  let fixture: ComponentFixture<GrafiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
