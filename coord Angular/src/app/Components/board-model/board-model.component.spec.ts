import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModelComponent } from './board-model.component';

describe('BoardModelComponent', () => {
  let component: BoardModelComponent;
  let fixture: ComponentFixture<BoardModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
