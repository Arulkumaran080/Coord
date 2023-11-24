import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformationPageComponent } from './conformation-page.component';

describe('ConformationPageComponent', () => {
  let component: ConformationPageComponent;
  let fixture: ComponentFixture<ConformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
