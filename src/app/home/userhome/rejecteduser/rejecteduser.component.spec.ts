import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejecteduserComponent } from './rejecteduser.component';

describe('RejecteduserComponent', () => {
  let component: RejecteduserComponent;
  let fixture: ComponentFixture<RejecteduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejecteduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejecteduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
