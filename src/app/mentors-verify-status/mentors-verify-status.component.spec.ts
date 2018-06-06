import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsVerifyStatusComponent } from './mentors-verify-status.component';

describe('MentorsVerifyStatusComponent', () => {
  let component: MentorsVerifyStatusComponent;
  let fixture: ComponentFixture<MentorsVerifyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorsVerifyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsVerifyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
