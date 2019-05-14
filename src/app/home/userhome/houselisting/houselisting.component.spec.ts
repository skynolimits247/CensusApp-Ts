import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouselistingComponent } from './houselisting.component';

describe('HouselistingComponent', () => {
  let component: HouselistingComponent;
  let fixture: ComponentFixture<HouselistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouselistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouselistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
