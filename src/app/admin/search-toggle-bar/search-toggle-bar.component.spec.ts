import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToggleBarComponent } from './search-toggle-bar.component';

describe('SearchToggleBarComponent', () => {
  let component: SearchToggleBarComponent;
  let fixture: ComponentFixture<SearchToggleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchToggleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToggleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
