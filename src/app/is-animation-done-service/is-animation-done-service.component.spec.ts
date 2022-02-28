import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsAnimationDoneServiceComponent } from './is-animation-done-service.component';

describe('IsAnimationDoneServiceComponent', () => {
  let component: IsAnimationDoneServiceComponent;
  let fixture: ComponentFixture<IsAnimationDoneServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsAnimationDoneServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsAnimationDoneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
