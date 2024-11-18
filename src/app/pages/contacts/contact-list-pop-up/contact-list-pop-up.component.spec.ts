import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListPopUpComponent } from './contact-list-pop-up.component';

describe('ContactListPopUpComponent', () => {
  let component: ContactListPopUpComponent;
  let fixture: ComponentFixture<ContactListPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
