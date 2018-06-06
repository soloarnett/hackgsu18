import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsLoginComponent } from './mentors-login.component';

describe('MentorsLoginComponent', () => {
  let component: MentorsLoginComponent;
  let fixture: ComponentFixture<MentorsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
