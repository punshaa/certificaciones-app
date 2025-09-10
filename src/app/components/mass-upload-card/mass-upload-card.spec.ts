import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassUploadCard } from './mass-upload-card';

describe('MassUploadCard', () => {
  let component: MassUploadCard;
  let fixture: ComponentFixture<MassUploadCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassUploadCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassUploadCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
