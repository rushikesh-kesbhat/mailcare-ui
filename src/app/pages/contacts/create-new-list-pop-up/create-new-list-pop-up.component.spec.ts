import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewListPopUpComponent } from './create-new-list-pop-up.component';

describe('CreateNewListPopUpComponent', () => {
  let component: CreateNewListPopUpComponent;
  let fixture: ComponentFixture<CreateNewListPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewListPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
