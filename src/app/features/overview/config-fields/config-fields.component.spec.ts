import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFieldsComponent } from './config-fields.component';

describe('ConfigFieldsComponent', () => {
  let component: ConfigFieldsComponent;
  let fixture: ComponentFixture<ConfigFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
