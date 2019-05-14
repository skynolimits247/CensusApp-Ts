import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensusregisterComponent } from './censusregister.component';

describe('CensusregisterComponent', () => {
  let component: CensusregisterComponent;
  let fixture: ComponentFixture<CensusregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensusregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensusregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
