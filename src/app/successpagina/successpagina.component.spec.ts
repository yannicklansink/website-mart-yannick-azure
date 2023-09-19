import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesspaginaComponent } from './successpagina.component';

describe('SuccesspaginaComponent', () => {
  let component: SuccesspaginaComponent;
  let fixture: ComponentFixture<SuccesspaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesspaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesspaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
