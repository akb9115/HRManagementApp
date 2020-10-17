import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTogglerComponent } from './view-toggler.component';

describe('ViewTogglerComponent', () => {
  let component: ViewTogglerComponent;
  let fixture: ComponentFixture<ViewTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
