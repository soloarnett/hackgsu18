import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTheAppComponent } from './get-the-app.component';

describe('GetTheAppComponent', () => {
  let component: GetTheAppComponent;
  let fixture: ComponentFixture<GetTheAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTheAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTheAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
