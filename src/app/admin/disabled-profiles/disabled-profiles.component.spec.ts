import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledProfilesComponent } from './disabled-profiles.component';

describe('DisabledProfilesComponent', () => {
  let component: DisabledProfilesComponent;
  let fixture: ComponentFixture<DisabledProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
