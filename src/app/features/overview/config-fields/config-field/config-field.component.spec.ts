import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFieldComponent } from './config-field.component';

describe('ConfigFieldComponent', () => {
  let component: ConfigFieldComponent;
  let fixture: ComponentFixture<ConfigFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
