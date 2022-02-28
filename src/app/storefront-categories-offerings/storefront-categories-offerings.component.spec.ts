import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontCategoriesOfferingsComponent } from './storefront-categories-offerings.component';

describe('StorefrontCategoriesOfferingsComponent', () => {
  let component: StorefrontCategoriesOfferingsComponent;
  let fixture: ComponentFixture<StorefrontCategoriesOfferingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorefrontCategoriesOfferingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontCategoriesOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
