import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekComponent } from './odsek.component';

describe('OdsekComponent', () => {
  let component: OdsekComponent;
  let fixture: ComponentFixture<OdsekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
