import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawareaComponent } from './drawarea.component';

describe('DrawareaComponent', () => {
  let component: DrawareaComponent;
  let fixture: ComponentFixture<DrawareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
