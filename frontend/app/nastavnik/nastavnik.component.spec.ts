import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikComponent } from './nastavnik.component';

describe('NastavnikComponent', () => {
  let component: NastavnikComponent;
  let fixture: ComponentFixture<NastavnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NastavnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NastavnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
