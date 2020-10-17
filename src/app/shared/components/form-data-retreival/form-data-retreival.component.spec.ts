import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataRetreivalComponent } from './form-data-retreival.component';

describe('FormDataRetreivalComponent', () => {
  let component: FormDataRetreivalComponent;
  let fixture: ComponentFixture<FormDataRetreivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataRetreivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataRetreivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
