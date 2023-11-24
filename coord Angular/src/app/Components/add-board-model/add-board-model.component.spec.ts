import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardModelComponent } from './add-board-model.component';

describe('AddBoardModelComponent', () => {
  let component: AddBoardModelComponent;
  let fixture: ComponentFixture<AddBoardModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoardModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoardModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
