import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsEditorComponent } from './fields-editor.component';

describe('FieldsEditorComponent', () => {
  let component: FieldsEditorComponent;
  let fixture: ComponentFixture<FieldsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
