import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordCardComponent } from './coord-card.component';

describe('CoordCardComponent', () => {
  let component: CoordCardComponent;
  let fixture: ComponentFixture<CoordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
