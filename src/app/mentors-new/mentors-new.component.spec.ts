import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsNewComponent } from './mentors-new.component';

describe('MentorsNewComponent', () => {
  let component: MentorsNewComponent;
  let fixture: ComponentFixture<MentorsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
