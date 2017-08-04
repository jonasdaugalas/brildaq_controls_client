import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCookieModalComponent } from './name-cookie-modal.component';

describe('NameCookieModalComponent', () => {
  let component: NameCookieModalComponent;
  let fixture: ComponentFixture<NameCookieModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCookieModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCookieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
