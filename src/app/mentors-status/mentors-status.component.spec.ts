import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsStatusComponent } from './mentors-status.component';

describe('MentorsStatusComponent', () => {
  let component: MentorsStatusComponent;
  let fixture: ComponentFixture<MentorsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
