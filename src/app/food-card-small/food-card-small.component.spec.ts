import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCardSmallComponent } from './food-card-small.component';

describe('FoodCardSmallComponent', () => {
  let component: FoodCardSmallComponent;
  let fixture: ComponentFixture<FoodCardSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCardSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
