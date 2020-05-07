import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostusedfoodsComponent } from './mostusedfoods.component';

describe('MostusedfoodsComponent', () => {
  let component: MostusedfoodsComponent;
  let fixture: ComponentFixture<MostusedfoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostusedfoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostusedfoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
