import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PopupComponent, DialogData } from './popup.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let mockDialogRef: MatDialogRef<PopupComponent>;
  let mockDialogData: DialogData;

  beforeEach(() => {
    mockDialogRef = {
      close: vi.fn(),
    } as unknown as MatDialogRef<PopupComponent>;

    mockDialogData = {
      name: 'Ash',
      pokemon: 'Pikachu',
    };

    TestBed.configureTestingModule({
      imports: [PopupComponent], // because it's a standalone component
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    });

    // IMPORTANT: Prevent performHeavyTasks from running and slowing tests
    vi.spyOn(PopupComponent.prototype, 'performHeavyTasks').mockImplementation(
      () => {}
    );

    const fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject dialog data correctly', () => {
    expect(component.data.name).toBe('Ash');
    expect(component.data.pokemon).toBe('Pikachu');
  });

  it('should call performHeavyTasks in ngOnInit', () => {
    const spy = vi.spyOn(component, 'performHeavyTasks');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should close the dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
