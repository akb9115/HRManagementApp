import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormElementsComponent } from './dynamic-form-elements.component';

describe('DynamicFormElementsComponent', () => {
  let component: DynamicFormElementsComponent;
  let fixture: ComponentFixture<DynamicFormElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
