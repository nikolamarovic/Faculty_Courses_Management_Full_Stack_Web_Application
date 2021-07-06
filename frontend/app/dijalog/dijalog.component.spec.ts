import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijalogComponent } from './dijalog.component';

describe('DijalogComponent', () => {
  let component: DijalogComponent;
  let fixture: ComponentFixture<DijalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DijalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
