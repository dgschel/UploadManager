import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePropertyComponent } from './file-property.component';

describe('FilePropertyComponent', () => {
  let component: FilePropertyComponent;
  let fixture: ComponentFixture<FilePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
