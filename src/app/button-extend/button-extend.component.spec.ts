import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonExtendComponent } from './button-extend.component';

describe('ButtonExtendComponent', () => {
  let component: ButtonExtendComponent;
  let fixture: ComponentFixture<ButtonExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonExtendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
