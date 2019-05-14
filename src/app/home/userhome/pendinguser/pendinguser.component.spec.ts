import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinguserComponent } from './pendinguser.component';

describe('PendinguserComponent', () => {
  let component: PendinguserComponent;
  let fixture: ComponentFixture<PendinguserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendinguserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendinguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
