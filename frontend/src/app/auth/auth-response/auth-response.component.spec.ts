import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResponseComponent } from './auth-response.component';

describe('AuthResponseComponent', () => {
  let component: AuthResponseComponent;
  let fixture: ComponentFixture<AuthResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
