import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetComponent } from './predmet.component';

describe('PredmetComponent', () => {
  let component: PredmetComponent;
  let fixture: ComponentFixture<PredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
