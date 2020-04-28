import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritedetailComponent } from './favoritedetail.component';

describe('FavoritedetailComponent', () => {
  let component: FavoritedetailComponent;
  let fixture: ComponentFixture<FavoritedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
